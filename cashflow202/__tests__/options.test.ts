import {
  openCall, openPut, openShort, openStraddle, closePosition, checkExpirations, canShort,
} from '../src/engine/options';
import { CONFIG } from '../src/data/config';
import type { Player } from '../src/types';
import { PROFESSIONS } from '../src/data/professions';

function makePlayer(): Player {
  const prof = PROFESSIONS.find((p) => p.id === 'engineer')!;
  return {
    id: 'p1',
    name: 'Тест',
    isBot: false,
    professionId: 'engineer',
    dreamId: 'dream-yacht',
    position: 0,
    onFastTrack: false,
    numChildren: 0,
    charityTurnsLeft: 0,
    downsizedTurnsLeft: 0,
    isEliminated: false,
    fastTrackStartIncome: 0,
    openPositions: [],
    income: {
      salary: prof.income.salary,
      taxes: prof.income.taxes,
      mortgage: prof.income.mortgage,
      studentLoan: prof.income.studentLoan,
      carLoan: prof.income.carLoan,
      creditCards: prof.income.creditCards,
      consumerDebt: prof.income.consumerDebt,
      otherExpenses: prof.income.otherExpenses,
      childExpenses: 0,
      bankLoanPayments: 0,
      interest: 0,
      dividends: 0,
      realEstateFlow: 0,
      businessFlow: 0,
    },
    balance: {
      savings: 20_000,
      stocks: [],
      realEstate: [],
      businesses: [],
      gold: [],
      homeMortgage: prof.liabilities.homeMortgage,
      studentLoanBalance: prof.liabilities.studentLoan,
      carLoanBalance: prof.liabilities.carLoan,
      creditCardBalance: prof.liabilities.creditCards,
      consumerDebtBalance: prof.liabilities.consumerDebt,
      investmentMortgages: 0,
      bankLoan: 0,
    },
  };
}

// ─── CALL ─────────────────────────────────────────────────────────────────────

test('openCall: deducts premium from savings', () => {
  const player = makePlayer();
  const result = openCall(player, 'MYT4U', 5, 100, 500, 1);
  expect(result.balance.savings).toBe(20_000 - 500);
  expect(result.openPositions).toHaveLength(1);
  expect(result.openPositions[0].type).toBe('call');
});

test('closePosition call: profit when price > strike', () => {
  let player = makePlayer();
  player = openCall(player, 'MYT4U', 5, 100, 500, 1);
  const pos = player.openPositions[0];
  // Current price = 8, strike = 5 → profit = (8-5)*100 - 500 = 300 - 500 = -200?
  // Wait: (8-5)*100 = 300, minus premium 500 = -200
  // Actually the function pays back premium + profit on close:
  // savings was 20000 - 500 = 19500
  // on close: +500 (premium back) + 300 (profit) = +800 → 19500 + 800 = 20300? No.
  // Looking at closeCall: saves savings + pos.premium + profit
  // where profit = (currentPrice - strike) * shares - premium = (8-5)*100 - 500 = -200
  // So net result: savings + 500 + (-200) = savings + 300
  const result = closePosition(player, pos.id, 8);
  // savings = 19500 + 500 + (300 - 500) = 19500 + 300 = 19800
  expect(result.profit).toBe(-200); // net profit after premium
  expect(result.player.balance.savings).toBe(19_500 + 500 + (300 - 500));
});

test('closePosition call: profitable at higher price', () => {
  let player = makePlayer();
  player = openCall(player, 'OK4U', 10, 200, 500, 1);
  const pos = player.openPositions[0];
  // price = 25, strike = 10 → (25-10)*200 = 3000, profit = 3000 - 500 = 2500
  const result = closePosition(player, pos.id, 25);
  expect(result.profit).toBe(2_500);
});

test('closePosition call: expired out of money → loss of premium', () => {
  let player = makePlayer();
  player = openCall(player, 'OK4U', 20, 100, 500, 1);
  const pos = player.openPositions[0];
  // price = 15 < strike 20 → expired worthless
  const result = closePosition(player, pos.id, 15);
  expect(result.profit).toBe(-500);
});

// ─── PUT ──────────────────────────────────────────────────────────────────────

test('openPut: deducts premium from savings', () => {
  const player = makePlayer();
  const result = openPut(player, 'OK4U', 25, 100, 500, 1);
  expect(result.balance.savings).toBe(20_000 - 500);
  expect(result.openPositions[0].type).toBe('put');
});

test('closePosition put: profit when price < strike', () => {
  let player = makePlayer();
  player = openPut(player, 'OK4U', 25, 100, 500, 1);
  const pos = player.openPositions[0];
  // price = 10, strike = 25 → (25-10)*100 = 1500, profit = 1500 - 500 = 1000
  const result = closePosition(player, pos.id, 10);
  expect(result.profit).toBe(1_000);
});

test('closePosition put: expired out of money', () => {
  let player = makePlayer();
  player = openPut(player, 'OK4U', 20, 100, 500, 1);
  const pos = player.openPositions[0];
  // price = 25 > strike 20 → worthless
  const result = closePosition(player, pos.id, 25);
  expect(result.profit).toBe(-500);
});

// ─── SHORT ────────────────────────────────────────────────────────────────────

test('openShort: freezes margin in savings', () => {
  const player = makePlayer();
  // Short 100 shares at $20 → margin = $2000
  const result = openShort(player, 'OK4U', 100, 20, 1);
  expect(result.balance.savings).toBe(20_000 - 2_000);
  expect(result.openPositions[0].margin).toBe(2_000);
});

test('closePosition short: profit when price drops', () => {
  let player = makePlayer();
  player = openShort(player, 'OK4U', 100, 20, 1);
  const pos = player.openPositions[0];
  // price drops to 10: profit = (20-10)*100 = 1000
  // marginReturn = margin + profit = 2000 + 1000 = 3000
  const result = closePosition(player, pos.id, 10);
  expect(result.profit).toBe(1_000);
  expect(result.player.balance.savings).toBe(18_000 + 3_000);
});

test('closePosition short: loss when price rises', () => {
  let player = makePlayer();
  player = openShort(player, 'OK4U', 100, 20, 1);
  const pos = player.openPositions[0];
  // price rises to 30: profit = (20-30)*100 = -1000
  // marginReturn = max(0, margin + profit) = max(0, 2000-1000) = 1000
  const result = closePosition(player, pos.id, 30);
  expect(result.profit).toBe(-1_000);
});

test('closePosition short: bankrupt stock — keep entire margin', () => {
  let player = makePlayer();
  player = openShort(player, '2BIG', 500, 8, 1);
  const pos = player.openPositions[0];
  // margin = 500*8 = 4000, price = 0
  const result = closePosition(player, pos.id, 0);
  expect(result.profit).toBe(500 * 8); // full margin kept as profit
});

// ─── STRADDLE ─────────────────────────────────────────────────────────────────

test('openStraddle: deducts combined premium', () => {
  const player = makePlayer();
  const result = openStraddle(player, 'MYT4U', 5, 100, CONFIG.STRADDLE_PREMIUM, 1);
  expect(result.balance.savings).toBe(20_000 - CONFIG.STRADDLE_PREMIUM);
});

test('closePosition straddle: profit on big upward move', () => {
  let player = makePlayer();
  player = openStraddle(player, 'MYT4U', 5, 100, 900, 1);
  const pos = player.openPositions[0];
  // price = 15, strike = 5 → call profit = (15-5)*100 = 1000; put = 0
  // net = max(1000, 0) - 900 = 100
  const result = closePosition(player, pos.id, 15);
  expect(result.profit).toBe(100);
});

test('closePosition straddle: loss when price stays flat', () => {
  let player = makePlayer();
  player = openStraddle(player, 'MYT4U', 5, 100, 900, 1);
  const pos = player.openPositions[0];
  // price = 5 (same as strike) → both legs = 0 → loss = 900
  const result = closePosition(player, pos.id, 5);
  expect(result.profit).toBe(-900);
});

// ─── Expiration ───────────────────────────────────────────────────────────────

test('checkExpirations: auto-exercises profitable call', () => {
  let player = makePlayer();
  player = openCall(player, 'MYT4U', 5, 100, 500, 1);
  const prices = { MYT4U: 8 };
  const result = checkExpirations(player, 2, prices);
  expect(result.player.openPositions[0].status).toBe('closed');
  expect(result.messages.length).toBeGreaterThan(0);
});

test('checkExpirations: expires worthless call at turn limit', () => {
  let player = makePlayer();
  player = openCall(player, 'MYT4U', 5, 100, 500, 1);
  const prices = { MYT4U: 3 }; // below strike
  // Turn = openedAtTurn + OPTION_EXPIRY_TURNS = 1 + 3 = 4
  const result = checkExpirations(player, 1 + CONFIG.OPTION_EXPIRY_TURNS, prices);
  expect(result.player.openPositions[0].status).toBe('expired');
});

// ─── canShort ────────────────────────────────────────────────────────────────

test('canShort: true when near top of range', () => {
  // OK4U range [5, 30], threshold 0.85 → need price >= 25.5
  expect(canShort(28, 30)).toBe(true);
  expect(canShort(20, 30)).toBe(false);
});
