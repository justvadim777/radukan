// All tunable game balance numbers live here.

export const CONFIG = {
  // Board
  RAT_RACE_CELLS: 24,
  FAST_TRACK_CELLS: 16,

  // Dice
  RAT_RACE_DICE: 1,
  FAST_TRACK_DICE: 2,

  // Bank loans
  BANK_LOAN_UNIT: 1_000,         // borrow/repay in multiples of $1000
  BANK_LOAN_MONTHLY_RATE: 100,   // $100/mo per $1000 borrowed

  // Win condition
  FAST_TRACK_CASHFLOW_BONUS: 50_000, // need +$50k/mo above buyout income

  // Children
  MAX_CHILDREN: 3,

  // Downsized
  DOWNSIZED_TURNS_SKIPPED: 2,

  // Charity
  CHARITY_PAYOUT_FRACTION: 0.1,  // 10% of total income
  CHARITY_DICE_CHOICE_TURNS: 3,

  // Bankruptcy forced-sale recovery
  BANKRUPTCY_ASSET_RECOVERY_FRACTION: 0.5, // get 50% of down payment back

  // 202 Options
  OPTION_EXPIRY_TURNS: 3,        // market-event turns until expiry
  CALL_PREMIUM: 500,             // default call premium per contract
  PUT_PREMIUM: 500,              // default put premium per contract
  STRADDLE_PREMIUM: 900,         // call + put combined (slight discount)
  OPTIONS_DEFAULT_SHARES: 100,   // shares per option contract

  // Stock volatility multiplier (202 vs 101)
  STOCK_VOLATILITY: 1.5,

  // Short selling
  SHORT_AVAILABLE_THRESHOLD: 0.85, // stock must be >= 85% of max range to short
  SHORT_HALF_PROFIT_THRESHOLD: 0.5, // price dropped to 50% of short sale → take half margin

  // Fast Track
  BUYOUT_MULTIPLIER: 100,        // Buyout = 100 × passive income

  // Savings interest rate (default, market cards can change)
  SAVINGS_ANNUAL_INTEREST_RATE: 0.05,  // 5% pa → ÷12 per month

  // AI bot cash buffer multiplier
  BOT_CASH_BUFFER_EASY: 2,      // keep 2× monthly expenses in cash
  BOT_CASH_BUFFER_MEDIUM: 1.5,
  BOT_CASH_BUFFER_HARD: 1,

  BOT_TURN_DELAY_MS: 800,
} as const;
