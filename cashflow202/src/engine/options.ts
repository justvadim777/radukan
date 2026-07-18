import type { Player, OpenPosition, PositionType } from '../types';
import { CONFIG } from '../data/config';

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Open positions ────────────────────────────────────────────────────────────

export function openCall(
  player: Player,
  ticker: string,
  strike: number,
  shares: number,
  premium: number,
  currentTurn: number
): Player {
  const position: OpenPosition = {
    id: uid(),
    type: 'call',
    ticker,
    shares,
    strike,
    premium,
    margin: 0,
    openedAtTurn: currentTurn,
    expiresAtTurn: currentTurn + CONFIG.OPTION_EXPIRY_TURNS,
    shortSalePrice: 0,
    status: 'open',
  };
  return {
    ...player,
    balance: { ...player.balance, savings: player.balance.savings - premium },
    openPositions: [...player.openPositions, position],
  };
}

export function openPut(
  player: Player,
  ticker: string,
  strike: number,
  shares: number,
  premium: number,
  currentTurn: number
): Player {
  const position: OpenPosition = {
    id: uid(),
    type: 'put',
    ticker,
    shares,
    strike,
    premium,
    margin: 0,
    openedAtTurn: currentTurn,
    expiresAtTurn: currentTurn + CONFIG.OPTION_EXPIRY_TURNS,
    shortSalePrice: 0,
    status: 'open',
  };
  return {
    ...player,
    balance: { ...player.balance, savings: player.balance.savings - premium },
    openPositions: [...player.openPositions, position],
  };
}

export function openShort(
  player: Player,
  ticker: string,
  shares: number,
  currentPrice: number,
  currentTurn: number
): Player {
  const margin = currentPrice * shares;
  const position: OpenPosition = {
    id: uid(),
    type: 'short',
    ticker,
    shares,
    strike: 0,
    premium: 0,
    margin,
    openedAtTurn: currentTurn,
    expiresAtTurn: currentTurn + CONFIG.OPTION_EXPIRY_TURNS,
    shortSalePrice: currentPrice,
    status: 'open',
  };
  return {
    ...player,
    balance: { ...player.balance, savings: player.balance.savings - margin },
    openPositions: [...player.openPositions, position],
  };
}

export function openStraddle(
  player: Player,
  ticker: string,
  strike: number,
  shares: number,
  premium: number,
  currentTurn: number
): Player {
  const position: OpenPosition = {
    id: uid(),
    type: 'straddle',
    ticker,
    shares,
    strike,
    premium,
    margin: 0,
    openedAtTurn: currentTurn,
    expiresAtTurn: currentTurn + CONFIG.OPTION_EXPIRY_TURNS,
    shortSalePrice: 0,
    status: 'open',
  };
  return {
    ...player,
    balance: { ...player.balance, savings: player.balance.savings - premium },
    openPositions: [...player.openPositions, position],
  };
}

// ─── Close / exercise positions ───────────────────────────────────────────────

interface PositionResult {
  player: Player;
  profit: number;
  message: string;
}

function closeCall(player: Player, pos: OpenPosition, currentPrice: number): PositionResult {
  if (currentPrice > pos.strike) {
    const profit = (currentPrice - pos.strike) * pos.shares - pos.premium;
    return {
      player: {
        ...player,
        balance: { ...player.balance, savings: player.balance.savings + pos.premium + profit },
        openPositions: player.openPositions.map((p) =>
          p.id === pos.id ? { ...p, status: 'closed' } : p
        ),
      },
      profit,
      message: `Колл исполнен! Прибыль: $${profit.toLocaleString('ru')}`,
    };
  }
  // out of money — premium already paid, just mark closed
  return {
    player: {
      ...player,
      openPositions: player.openPositions.map((p) =>
        p.id === pos.id ? { ...p, status: 'closed' } : p
      ),
    },
    profit: -pos.premium,
    message: `Колл истёк. Потеря премии: $${pos.premium.toLocaleString('ru')}`,
  };
}

function closePut(player: Player, pos: OpenPosition, currentPrice: number): PositionResult {
  if (currentPrice < pos.strike) {
    const profit = (pos.strike - currentPrice) * pos.shares - pos.premium;
    return {
      player: {
        ...player,
        balance: { ...player.balance, savings: player.balance.savings + pos.premium + profit },
        openPositions: player.openPositions.map((p) =>
          p.id === pos.id ? { ...p, status: 'closed' } : p
        ),
      },
      profit,
      message: `Пут исполнен! Прибыль: $${profit.toLocaleString('ru')}`,
    };
  }
  return {
    player: {
      ...player,
      openPositions: player.openPositions.map((p) =>
        p.id === pos.id ? { ...p, status: 'closed' } : p
      ),
    },
    profit: -pos.premium,
    message: `Пут истёк. Потеря премии: $${pos.premium.toLocaleString('ru')}`,
  };
}

function closeShort(player: Player, pos: OpenPosition, currentPrice: number): PositionResult {
  const profit = (pos.shortSalePrice - currentPrice) * pos.shares;
  let marginReturn: number;

  if (currentPrice === 0) {
    // Bankrupt stock — keep entire margin
    marginReturn = pos.margin;
  } else if (currentPrice <= pos.shortSalePrice * CONFIG.SHORT_HALF_PROFIT_THRESHOLD) {
    // Dropped 50%+ — return half margin as profit
    marginReturn = pos.margin + pos.margin * 0.5;
  } else if (profit >= 0) {
    // Profitable: return margin + profit
    marginReturn = pos.margin + profit;
  } else {
    // Loss: return margin minus the loss (or 0 if fully wiped)
    marginReturn = Math.max(0, pos.margin + profit);
  }

  return {
    player: {
      ...player,
      balance: { ...player.balance, savings: player.balance.savings + marginReturn },
      openPositions: player.openPositions.map((p) =>
        p.id === pos.id ? { ...p, status: 'closed' } : p
      ),
    },
    profit,
    message: profit >= 0
      ? `Шорт закрыт с прибылью: $${profit.toLocaleString('ru')}`
      : `Шорт закрыт с убытком: $${Math.abs(profit).toLocaleString('ru')}`,
  };
}

function closeStraddle(player: Player, pos: OpenPosition, currentPrice: number): PositionResult {
  const callProfit = Math.max(0, currentPrice - pos.strike);
  const putProfit = Math.max(0, pos.strike - currentPrice);
  const best = Math.max(callProfit, putProfit);
  const profit = best * pos.shares - pos.premium;
  const payout = profit > 0 ? pos.premium + profit : 0;

  return {
    player: {
      ...player,
      balance: { ...player.balance, savings: player.balance.savings + payout },
      openPositions: player.openPositions.map((p) =>
        p.id === pos.id ? { ...p, status: 'closed' } : p
      ),
    },
    profit,
    message: profit > 0
      ? `Страддл исполнен! Прибыль: $${profit.toLocaleString('ru')}`
      : `Страддл истёк. Потеря премии: $${pos.premium.toLocaleString('ru')}`,
  };
}

export function closePosition(
  player: Player,
  positionId: string,
  currentPrice: number
): PositionResult {
  const pos = player.openPositions.find((p) => p.id === positionId);
  if (!pos || pos.status !== 'open') {
    return { player, profit: 0, message: '' };
  }

  switch (pos.type) {
    case 'call':     return closeCall(player, pos, currentPrice);
    case 'put':      return closePut(player, pos, currentPrice);
    case 'short':    return closeShort(player, pos, currentPrice);
    case 'straddle': return closeStraddle(player, pos, currentPrice);
  }
}

/**
 * Check all open positions for expiry or auto-exercise on a market event.
 * Returns array of [updatedPlayer, message] tuples.
 */
export function checkExpirations(
  player: Player,
  currentMarketTurn: number,
  stockPrices: Record<string, number>
): { player: Player; messages: string[] } {
  const messages: string[] = [];
  let p = { ...player };

  for (const pos of p.openPositions.filter((x) => x.status === 'open')) {
    const currentPrice = stockPrices[pos.ticker] ?? 0;

    // Auto-exercise call/put if profitable
    if (pos.type === 'call' && currentPrice > pos.strike) {
      const result = closeCall(p, pos, currentPrice);
      p = result.player;
      messages.push(result.message);
      continue;
    }
    if (pos.type === 'put' && currentPrice < pos.strike) {
      const result = closePut(p, pos, currentPrice);
      p = result.player;
      messages.push(result.message);
      continue;
    }
    // Straddle auto-exercise if profitable
    if (pos.type === 'straddle') {
      const callP = Math.max(0, currentPrice - pos.strike) * pos.shares;
      const putP = Math.max(0, pos.strike - currentPrice) * pos.shares;
      if (Math.max(callP, putP) > pos.premium) {
        const result = closeStraddle(p, pos, currentPrice);
        p = result.player;
        messages.push(result.message);
        continue;
      }
    }

    // Check expiry
    if (currentMarketTurn >= pos.expiresAtTurn) {
      if (pos.type === 'short') {
        // Forced cover
        const result = closeShort(p, pos, currentPrice);
        p = result.player;
        messages.push('Шорт принудительно закрыт. ' + result.message);
      } else {
        // Expired worthless
        p = {
          ...p,
          openPositions: p.openPositions.map((x) =>
            x.id === pos.id ? { ...x, status: 'expired' } : x
          ),
        };
        messages.push(`Позиция ${pos.type} на ${pos.ticker} истекла. Потеря: $${pos.premium.toLocaleString('ru')}`);
      }
    }
  }

  return { player: p, messages };
}

/** Is this stock available for short selling? (near top of range) */
export function canShort(
  currentPrice: number,
  maxPrice: number
): boolean {
  return currentPrice >= maxPrice * CONFIG.SHORT_AVAILABLE_THRESHOLD;
}
