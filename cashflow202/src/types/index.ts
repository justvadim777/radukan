// ─── Asset types ────────────────────────────────────────────────────────────

export type AssetType = 'stock' | 'real-estate' | 'business' | 'savings' | 'gold';

export interface StockHolding {
  id: string;
  ticker: string;
  shares: number;
  avgPrice: number;       // price paid per share
  dividendPerShare: number;
}

export interface RealEstateAsset {
  id: string;
  name: string;
  purchasePrice: number;
  downPayment: number;
  mortgageBalance: number;
  monthlyFlow: number;    // rent - mortgage payment
  priceRange: [number, number];
  dealCardId: string;     // reference to the deal card
}

export interface BusinessAsset {
  id: string;
  name: string;
  purchasePrice: number;
  downPayment: number;
  loanBalance: number;
  monthlyFlow: number;
  dealCardId: string;
}

export interface GoldAsset {
  id: string;
  name: string;           // e.g. "Золотые монеты"
  purchasePrice: number;
  quantity: number;
  unitPrice: number;
  priceRange: [number, number];
}

// ─── Liabilities ────────────────────────────────────────────────────────────

export interface IncomeStatement {
  salary: number;
  interest: number;       // from savings/CDs
  dividends: number;      // from stocks
  realEstateFlow: number; // sum of real-estate monthly flows
  businessFlow: number;   // sum of business monthly flows
  taxes: number;
  mortgage: number;       // primary home mortgage payment
  studentLoan: number;
  carLoan: number;
  creditCards: number;
  consumerDebt: number;
  childExpenses: number;  // per-child * numChildren
  otherExpenses: number;
  bankLoanPayments: number; // 100$/mo per 1000$ borrowed
}

export interface BalanceSheet {
  savings: number;
  stocks: StockHolding[];
  realEstate: RealEstateAsset[];
  businesses: BusinessAsset[];
  gold: GoldAsset[];
  // liabilities
  homeMortgage: number;
  studentLoanBalance: number;
  carLoanBalance: number;
  creditCardBalance: number;
  consumerDebtBalance: number;
  investmentMortgages: number; // sum of real-estate mortgages
  bankLoan: number;            // total outstanding bank loan
}

// ─── Options / Short positions (202 mechanics) ──────────────────────────────

export type PositionType = 'call' | 'put' | 'short' | 'straddle';
export type PositionStatus = 'open' | 'expired' | 'closed';

export interface OpenPosition {
  id: string;
  type: PositionType;
  ticker: string;
  shares: number;
  strike: number;        // for call/put/straddle
  premium: number;       // cost paid (for call/put/straddle)
  margin: number;        // frozen cash (for short)
  openedAtTurn: number;
  expiresAtTurn: number; // openedAtTurn + OPTION_EXPIRY_TURNS
  shortSalePrice: number;// for short: price at which sold
  status: PositionStatus;
}

// ─── Player ─────────────────────────────────────────────────────────────────

export type BotLevel = 'easy' | 'medium' | 'hard';

export interface Player {
  id: string;
  name: string;
  isBot: boolean;
  botLevel?: BotLevel;
  professionId: string;
  dreamId: string;
  // position
  position: number;      // 0-23 in rat race; 0-15 in fast track
  onFastTrack: boolean;
  // financial state
  income: IncomeStatement;
  balance: BalanceSheet;
  numChildren: number;   // 0-3
  charityTurnsLeft: number; // can choose 1 or 2 dice for next N turns
  downsizedTurnsLeft: number; // skip turns
  isEliminated: boolean;
  fastTrackStartIncome: number; // income when entering fast track (for win condition)
  // 202 mechanics
  openPositions: OpenPosition[];
}

// ─── Board cells ─────────────────────────────────────────────────────────────

export type RatRaceCellType =
  | 'payday'
  | 'opportunity'
  | 'market'
  | 'doodad'
  | 'charity'
  | 'baby'
  | 'downsized';

export type FastTrackCellType =
  | 'cashflow-day'
  | 'business'
  | 'dream'
  | 'charity'
  | 'tax-audit'
  | 'divorce'
  | 'lawsuit';

export interface RatRaceCell {
  index: number;
  type: RatRaceCellType;
  label: string;
}

export interface FastTrackCell {
  index: number;
  type: FastTrackCellType;
  label: string;
  businessId?: string; // for 'business' cells
  dreamId?: string;    // for 'dream' cells
}

// ─── Cards / Deals ────────────────────────────────────────────────────────────

export type DealSize = 'small' | 'large';
export type DealType = 'stock' | 'real-estate' | 'business' | 'gold' | 'partnership';

export interface Deal {
  id: string;
  size: DealSize;
  type: DealType;
  title: string;
  description: string;
  price: number;
  downPayment: number;
  loanAmount: number;
  monthlyFlow: number;   // 0 for stocks/gold
  // for stocks
  ticker?: string;
  shares?: number;
  pricePerShare?: number;
  dividendPerShare?: number;
  // for real-estate / business
  priceRange?: [number, number];
}

export interface MarketCard {
  id: string;
  title: string;
  description: string;
  // changes
  ticker?: string;          // affected stock
  newStockPrice?: number;
  affectedDealType?: DealType;
  affectedDealId?: string;
  buyerPrice?: number;      // if a buyer appears for real-estate
  interestRateChange?: number; // % change to savings interest
}

export interface Doodad {
  id: string;
  title: string;
  description: string;
  cost: number;
}

export interface Dream {
  id: string;
  name: string;
  description: string;
  cost: number; // cost on fast track to buy dream
}

export interface FastTrackBusiness {
  id: string;
  name: string;
  description: string;
  cost: number;
  monthlyFlow: number;
}

// ─── Profession ───────────────────────────────────────────────────────────────

export interface Profession {
  id: string;
  name: string;
  income: Omit<IncomeStatement, 'dividends' | 'interest' | 'realEstateFlow' | 'businessFlow' | 'bankLoanPayments' | 'childExpenses'> & {
    perChildExpense: number;
  };
  startingSavings: number;
  liabilities: {
    homeMortgage: number;
    studentLoan: number;
    carLoan: number;
    creditCards: number;
    consumerDebt: number;
  };
}

// ─── Game log ────────────────────────────────────────────────────────────────

export interface LogEntry {
  turn: number;
  playerId: string;
  message: string;
  timestamp: number;
}

// ─── Game state ───────────────────────────────────────────────────────────────

export interface GameState {
  phase: 'setup' | 'playing' | 'finished';
  turnNumber: number;
  currentPlayerIndex: number;
  players: Player[];
  smallDealDeck: Deal[];
  largeDealDeck: Deal[];
  marketDeck: MarketCard[];
  doodadDeck: Doodad[];
  discardedSmall: Deal[];
  discardedLarge: Deal[];
  discardedMarket: MarketCard[];
  discardedDoodads: Doodad[];
  // current stock prices (market can move these)
  stockPrices: Record<string, number>;
  winnerId: string | null;
  log: LogEntry[];
  // pending action waiting for human decision
  pendingEvent: PendingEvent | null;
}

// ─── Pending events (human must respond) ─────────────────────────────────────

export type PendingEventType =
  | 'deal-offer'
  | 'market-event'
  | 'doodad'
  | 'charity'
  | 'payday'
  | 'baby'
  | 'downsized'
  | 'bankruptcy-choice'
  | 'choose-dice';

export interface PendingEvent {
  type: PendingEventType;
  deal?: Deal;
  marketCard?: MarketCard;
  doodad?: Doodad;
  doodadCost?: number;
}
