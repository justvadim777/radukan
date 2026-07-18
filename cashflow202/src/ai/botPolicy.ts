import type { GameState, Player, Deal, BotLevel } from '../types';
import { calcCashflow, calcPassiveIncome, calcTotalExpenses } from '../engine/financials';
import { canAffordDeal } from '../engine/deals';
import { canShort } from '../engine/options';
import { CONFIG } from '../data/config';
import { STOCKS } from '../data/stocks';

export interface BotAction {
  type: 'buy-deal' | 'skip-deal' | 'buy-call' | 'buy-put' | 'open-short' | 'skip-options' | 'charity' | 'no-charity' | 'bank-loan' | 'none';
  deal?: Deal;
  ticker?: string;
  strike?: number;
  loanAmount?: number;
  message: string;
}

function cashBuffer(level: BotLevel): number {
  switch (level) {
    case 'easy':   return CONFIG.BOT_CASH_BUFFER_EASY;
    case 'medium': return CONFIG.BOT_CASH_BUFFER_MEDIUM;
    case 'hard':   return CONFIG.BOT_CASH_BUFFER_HARD;
  }
}

function monthlyExpenses(player: Player): number {
  return calcTotalExpenses(player);
}

function hasSufficientBuffer(player: Player, cost: number, level: BotLevel): boolean {
  const required = monthlyExpenses(player) * cashBuffer(level);
  return (player.balance.savings - cost) >= required;
}

function chooseDeal(player: Player, state: GameState, level: BotLevel): BotAction {
  const savings = player.balance.savings;
  const expenses = monthlyExpenses(player);
  const buffer = expenses * cashBuffer(level);

  // Try small deals first — only if positive flow
  for (const deal of state.smallDealDeck) {
    if (!canAffordDeal(player, deal)) continue;
    if (deal.monthlyFlow <= 0 && level === 'easy') continue; // easy bots skip zero-flow
    if (savings - deal.downPayment < buffer) continue;
    if (deal.monthlyFlow > 0) {
      return { type: 'buy-deal', deal, message: `Покупаю: ${deal.title} (+$${deal.monthlyFlow}/мес)` };
    }
    // medium/hard may buy stocks speculatively
    if (level !== 'easy' && deal.type === 'stock') {
      const stock = STOCKS.find((s) => s.ticker === deal.ticker);
      if (stock) {
        const currentPrice = state.stockPrices[stock.ticker] ?? stock.startPrice;
        if (currentPrice <= stock.priceRange[0] * 1.2) {
          // Near bottom of range — buy
          return { type: 'buy-deal', deal, message: `Покупаю акции ${deal.ticker} у нижней границы` };
        }
      }
    }
  }

  // Large deals: only if sufficient buffer
  if (level !== 'easy') {
    for (const deal of state.largeDealDeck) {
      if (!canAffordDeal(player, deal)) continue;
      if (savings - deal.downPayment < buffer * 2) continue;
      if (deal.monthlyFlow > 0) {
        return { type: 'buy-deal', deal, message: `Покупаю крупную сделку: ${deal.title} (+$${deal.monthlyFlow}/мес)` };
      }
    }
  }

  return { type: 'skip-deal', message: 'Пропускаю сделку — недостаточно резерва' };
}

function considerOptions(player: Player, state: GameState, level: BotLevel): BotAction {
  if (level === 'easy') return { type: 'skip-options', message: '' };

  for (const stock of STOCKS) {
    const currentPrice = state.stockPrices[stock.ticker] ?? stock.startPrice;
    const [minPrice, maxPrice] = stock.priceRange;

    if (level === 'hard') {
      // Near bottom → buy call
      if (currentPrice <= minPrice * 1.3 && player.balance.savings >= CONFIG.CALL_PREMIUM * 2) {
        return {
          type: 'buy-call',
          ticker: stock.ticker,
          strike: currentPrice,
          message: `Покупаю колл на ${stock.ticker} (цена у нижней границы $${currentPrice})`,
        };
      }
      // Near top → buy put
      if (currentPrice >= maxPrice * 0.85 && player.balance.savings >= CONFIG.PUT_PREMIUM * 2) {
        return {
          type: 'buy-put',
          ticker: stock.ticker,
          strike: currentPrice,
          message: `Покупаю пут на ${stock.ticker} (цена у верхней границы $${currentPrice})`,
        };
      }
      // Can short
      if (canShort(currentPrice, maxPrice) && player.balance.savings >= currentPrice * CONFIG.OPTIONS_DEFAULT_SHARES * 1.5) {
        return {
          type: 'open-short',
          ticker: stock.ticker,
          message: `Открываю шорт по ${stock.ticker} (цена $${currentPrice})`,
        };
      }
    }
  }

  return { type: 'skip-options', message: '' };
}

/**
 * Decide what a bot does when it must respond to the current pending event.
 * Returns the action the bot will take.
 */
export function decideBotAction(state: GameState, player: Player): BotAction {
  const level = player.botLevel ?? 'easy';
  const event = state.pendingEvent;

  if (!event) return { type: 'none', message: '' };

  switch (event.type) {
    case 'deal-offer': {
      const action = chooseDeal(player, state, level);
      // Also consider 202 options on medium/hard
      if (action.type === 'skip-deal' && level !== 'easy') {
        const optionAction = considerOptions(player, state, level);
        if (optionAction.type !== 'skip-options') return optionAction;
      }
      return action;
    }

    case 'market-event': {
      // Bots always accept market events (no choice)
      return { type: 'none', message: 'Принимаю рыночное событие' };
    }

    case 'doodad': {
      const cost = event.doodadCost ?? 0;
      const expenses = monthlyExpenses(player);
      const buffer = expenses * cashBuffer(level);
      if (player.balance.savings >= cost + buffer) {
        return { type: 'none', message: `Плачу мелкие расходы $${cost.toLocaleString('ru')} из кармана` };
      }
      // Take loan to cover
      return {
        type: 'bank-loan',
        loanAmount: Math.ceil(cost / 1000) * 1000,
        message: `Беру кредит $${Math.ceil(cost / 1000) * 1000} для покрытия расходов`,
      };
    }

    case 'charity': {
      const donation = Math.floor(player.income.salary * CONFIG.CHARITY_PAYOUT_FRACTION);
      const buffer = monthlyExpenses(player) * cashBuffer(level);
      if (level !== 'easy' && player.balance.savings - donation >= buffer) {
        return { type: 'charity', message: `Жертвую $${donation.toLocaleString('ru')} на благотворительность` };
      }
      return { type: 'no-charity', message: 'Пропускаю благотворительность' };
    }

    case 'baby':
    case 'downsized':
    case 'payday':
      return { type: 'none', message: '' };

    default:
      return { type: 'none', message: '' };
  }
}

/** Format bot action as a Russian log message */
export function botActionMessage(botName: string, action: BotAction): string {
  if (!action.message) return '';
  return `${botName}: ${action.message}`;
}
