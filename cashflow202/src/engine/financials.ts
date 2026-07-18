import type { Player } from '../types';
import { CONFIG } from '../data/config';

/** Monthly interest income from savings */
export function calcInterest(savings: number, annualRate: number): number {
  return Math.floor((savings * annualRate) / 12);
}

/** Monthly dividend income from all stock holdings */
export function calcDividends(player: Player): number {
  return player.balance.stocks.reduce((sum, h) => {
    return sum + Math.floor((h.shares * h.dividendPerShare) / 12);
  }, 0);
}

/** Total monthly real-estate cashflow */
export function calcRealEstateFlow(player: Player): number {
  return player.balance.realEstate.reduce((sum, r) => sum + r.monthlyFlow, 0);
}

/** Total monthly business cashflow */
export function calcBusinessFlow(player: Player): number {
  return player.balance.businesses.reduce((sum, b) => sum + b.monthlyFlow, 0);
}

/** Passive income = interest + dividends + real-estate flow + business flow */
export function calcPassiveIncome(player: Player, savingsRate: number): number {
  return (
    calcInterest(player.balance.savings, savingsRate) +
    calcDividends(player) +
    calcRealEstateFlow(player) +
    calcBusinessFlow(player)
  );
}

/** Total monthly expenses */
export function calcTotalExpenses(player: Player): number {
  const inc = player.income;
  return (
    inc.taxes +
    inc.mortgage +
    inc.studentLoan +
    inc.carLoan +
    inc.creditCards +
    inc.consumerDebt +
    inc.otherExpenses +
    inc.childExpenses +
    inc.bankLoanPayments
  );
}

/** Total monthly income (salary + passive) */
export function calcTotalIncome(player: Player, savingsRate: number): number {
  return player.income.salary + calcPassiveIncome(player, savingsRate);
}

/**
 * Monthly cashflow = total income − total expenses.
 * This is what the player receives (or pays) on PayDay.
 */
export function calcCashflow(player: Player, savingsRate: number): number {
  return calcTotalIncome(player, savingsRate) - calcTotalExpenses(player);
}

/** Total assets value */
export function calcTotalAssets(player: Player, stockPrices: Record<string, number>): number {
  const savings = player.balance.savings;
  const stocks = player.balance.stocks.reduce((sum, h) => {
    const price = stockPrices[h.ticker] ?? h.avgPrice;
    return sum + price * h.shares;
  }, 0);
  const re = player.balance.realEstate.reduce((sum, r) => sum + r.purchasePrice, 0);
  const biz = player.balance.businesses.reduce((sum, b) => sum + b.purchasePrice, 0);
  return savings + stocks + re + biz;
}

/** Total liabilities */
export function calcTotalLiabilities(player: Player): number {
  return (
    player.balance.homeMortgage +
    player.balance.studentLoanBalance +
    player.balance.carLoanBalance +
    player.balance.creditCardBalance +
    player.balance.consumerDebtBalance +
    player.balance.investmentMortgages +
    player.balance.bankLoan
  );
}

/** Net worth = total assets − total liabilities */
export function calcNetWorth(player: Player, stockPrices: Record<string, number>): number {
  return calcTotalAssets(player, stockPrices) - calcTotalLiabilities(player);
}

/**
 * Apply bank loan: add amount to savings and bankLoan balance,
 * increase bankLoanPayments by 100 per 1000 borrowed.
 */
export function applyBankLoan(player: Player, amount: number): Player {
  const units = Math.floor(amount / CONFIG.BANK_LOAN_UNIT);
  const actualAmount = units * CONFIG.BANK_LOAN_UNIT;
  return {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings + actualAmount,
      bankLoan: player.balance.bankLoan + actualAmount,
    },
    income: {
      ...player.income,
      bankLoanPayments: player.income.bankLoanPayments + units * CONFIG.BANK_LOAN_MONTHLY_RATE,
    },
  };
}

/**
 * Repay bank loan: remove amount from savings, bankLoan balance,
 * and decrease bankLoanPayments.
 */
export function repayBankLoan(player: Player, amount: number): Player {
  const units = Math.min(
    Math.floor(amount / CONFIG.BANK_LOAN_UNIT),
    Math.floor(player.balance.bankLoan / CONFIG.BANK_LOAN_UNIT)
  );
  const actualAmount = units * CONFIG.BANK_LOAN_UNIT;
  return {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings - actualAmount,
      bankLoan: player.balance.bankLoan - actualAmount,
    },
    income: {
      ...player.income,
      bankLoanPayments: player.income.bankLoanPayments - units * CONFIG.BANK_LOAN_MONTHLY_RATE,
    },
  };
}

/** Rebuild income statement's passive income fields after buying/selling assets */
export function syncPassiveIncomeFields(
  player: Player,
  savingsRate: number
): Player {
  return {
    ...player,
    income: {
      ...player.income,
      interest: calcInterest(player.balance.savings, savingsRate),
      dividends: calcDividends(player),
      realEstateFlow: calcRealEstateFlow(player),
      businessFlow: calcBusinessFlow(player),
    },
  };
}
