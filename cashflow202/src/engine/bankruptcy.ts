import type { Player } from '../types';
import { CONFIG } from '../data/config';
import { calcCashflow } from './financials';
import { syncPassiveIncomeFields } from './financials';

/**
 * Handle a player who cannot pay their bills (negative cashflow that
 * exceeds available savings).
 *
 * Steps:
 * 1. Forced asset sales at 50% of down payment.
 * 2. Wipe 50% of auto / credit card / consumer debt.
 * 3. If still negative net savings → player is eliminated.
 *
 * Returns the updated player (possibly eliminated).
 */
export function handleBankruptcy(player: Player, savingsRate: number): Player {
  let p = { ...player };

  // Step 1: sell real estate at 50% of down payment
  for (const re of [...p.balance.realEstate]) {
    const recover = re.downPayment * CONFIG.BANKRUPTCY_ASSET_RECOVERY_FRACTION;
    p = {
      ...p,
      balance: {
        ...p.balance,
        savings: p.balance.savings + recover,
        realEstate: p.balance.realEstate.filter((r) => r.id !== re.id),
        investmentMortgages: p.balance.investmentMortgages - re.mortgageBalance,
      },
    };
    p = syncPassiveIncomeFields(p, savingsRate);
    if (p.balance.savings >= 0) return p; // recovered
  }

  // Step 2: sell businesses at 50% of down payment
  for (const biz of [...p.balance.businesses]) {
    const recover = biz.downPayment * CONFIG.BANKRUPTCY_ASSET_RECOVERY_FRACTION;
    p = {
      ...p,
      balance: {
        ...p.balance,
        savings: p.balance.savings + recover,
        businesses: p.balance.businesses.filter((b) => b.id !== biz.id),
      },
    };
    p = syncPassiveIncomeFields(p, savingsRate);
    if (p.balance.savings >= 0) return p;
  }

  // Step 3: cancel half of soft debts (car, credit cards, consumer)
  const carRelief = Math.floor(p.balance.carLoanBalance / 2);
  const ccRelief = Math.floor(p.balance.creditCardBalance / 2);
  const conRelief = Math.floor(p.balance.consumerDebtBalance / 2);

  p = {
    ...p,
    balance: {
      ...p.balance,
      carLoanBalance: p.balance.carLoanBalance - carRelief,
      creditCardBalance: p.balance.creditCardBalance - ccRelief,
      consumerDebtBalance: p.balance.consumerDebtBalance - conRelief,
    },
    income: {
      ...p.income,
      carLoan: Math.max(0, Math.floor(p.income.carLoan / 2)),
      creditCards: Math.max(0, Math.floor(p.income.creditCards / 2)),
      consumerDebt: Math.max(0, Math.floor(p.income.consumerDebt / 2)),
    },
  };

  if (p.balance.savings >= 0) return p;

  // Step 4: sell all stocks
  for (const stock of [...p.balance.stocks]) {
    // Forced sale at average cost (worst case: could sell at 0 but let's use avg)
    p = {
      ...p,
      balance: {
        ...p.balance,
        stocks: p.balance.stocks.filter((s) => s.id !== stock.id),
      },
    };
    if (p.balance.savings >= 0) return p;
  }

  // Step 5: eliminate
  return { ...p, isEliminated: true };
}
