import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameState, Player, Deal, MarketCard, Doodad } from '../types';
import { PROFESSIONS } from '../data/professions';
import { SMALL_DEALS } from '../data/smallDeals';
import { BIG_DEALS } from '../data/bigDeals';
import { MARKET_CARDS } from '../data/marketCards';
import { DOODADS } from '../data/doodads';
import { DREAMS } from '../data/dreams';
import { STOCKS } from '../data/stocks';
import { CONFIG } from '../data/config';
import { rollAndMove, advanceTurn, applyPayday, applyMarketCard } from '../engine/turn';
import { applyDeal, canAffordDeal } from '../engine/deals';
import { applyBankLoan, repayBankLoan, syncPassiveIncomeFields } from '../engine/financials';
import { checkRatRaceExit } from '../engine/winCondition';

const SAVE_KEY = 'cashflow202_save';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function buildInitialPlayer(
  professionId: string,
  dreamId: string,
  name: string,
  isBot: boolean,
  botLevel?: 'easy' | 'medium' | 'hard'
): Player {
  const prof = PROFESSIONS.find((p) => p.id === professionId) ?? PROFESSIONS[0];
  const dream = DREAMS.find((d) => d.id === dreamId) ?? DREAMS[0];

  return {
    id: uid(),
    name,
    isBot,
    botLevel,
    professionId,
    dreamId: dream.id,
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
      savings: prof.startingSavings,
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

function buildInitialGameState(
  professionId: string,
  humanName: string,
  botCount: number,
  botLevel: 'easy' | 'medium' | 'hard',
  dreamId: string
): GameState {
  const initialPrices: Record<string, number> = {};
  STOCKS.forEach((s) => { initialPrices[s.ticker] = s.startPrice; });

  const humanPlayer = buildInitialPlayer(professionId, dreamId, humanName, false);

  const professionIds = PROFESSIONS.map((p) => p.id).filter((id) => id !== professionId);
  const dreamIds = DREAMS.map((d) => d.id).filter((id) => id !== dreamId);

  const bots: Player[] = Array.from({ length: botCount }, (_, i) => {
    const pId = professionIds[i % professionIds.length];
    const dId = dreamIds[i % dreamIds.length];
    return buildInitialPlayer(pId, dId, `Бот ${i + 1}`, true, botLevel);
  });

  return {
    phase: 'playing',
    turnNumber: 1,
    currentPlayerIndex: 0,
    players: [humanPlayer, ...bots],
    smallDealDeck: shuffle(SMALL_DEALS),
    largeDealDeck: shuffle(BIG_DEALS),
    marketDeck: shuffle(MARKET_CARDS),
    doodadDeck: shuffle(DOODADS),
    discardedSmall: [],
    discardedLarge: [],
    discardedMarket: [],
    discardedDoodads: [],
    stockPrices: initialPrices,
    winnerId: null,
    log: [{
      turn: 1,
      playerId: humanPlayer.id,
      message: 'Игра началась! Удачи всем игрокам!',
      timestamp: Date.now(),
    }],
    pendingEvent: null,
  };
}

interface StoreState {
  game: GameState | null;
  savingsRate: number;

  // Actions
  newGame: (professionId: string, humanName: string, botCount: number, botLevel: 'easy' | 'medium' | 'hard', dreamId: string) => void;
  rollDice: () => void;
  buyDeal: (deal: Deal, size: 'small' | 'large') => void;
  skipDeal: () => void;
  acceptMarket: (card: MarketCard) => void;
  payDoodad: (cost: number, useLoan: boolean) => void;
  doCharity: (accept: boolean) => void;
  addBaby: () => void;
  applyDownsized: () => void;
  takeBankLoan: (amount: number) => void;
  repayLoan: (amount: number) => void;
  endTurn: () => void;
  saveGame: () => Promise<void>;
  loadGame: () => Promise<void>;
  clearGame: () => void;
}

export const useGameStore = create<StoreState>((set, get) => ({
  game: null,
  savingsRate: CONFIG.SAVINGS_ANNUAL_INTEREST_RATE,

  newGame: (professionId, humanName, botCount, botLevel, dreamId) => {
    const game = buildInitialGameState(professionId, humanName, botCount, botLevel, dreamId);
    set({ game });
    get().saveGame();
  },

  rollDice: () => {
    const { game } = get();
    if (!game || game.pendingEvent || game.winnerId) return;
    const newState = rollAndMove(game, Math.random);
    set({ game: newState });
    get().saveGame();
  },

  buyDeal: (deal, _size) => {
    const { game, savingsRate } = get();
    if (!game) return;
    const player = game.players[game.currentPlayerIndex];
    if (!canAffordDeal(player, deal)) return;

    const updatedPlayer = applyDeal(player, deal, savingsRate);
    const players = game.players.map((p, i) =>
      i === game.currentPlayerIndex ? updatedPlayer : p
    );

    // Discard the deal card
    const log = [...game.log, {
      turn: game.turnNumber,
      playerId: player.id,
      message: `${player.name} купил(а): ${deal.title} за $${deal.downPayment.toLocaleString('ru')}`,
      timestamp: Date.now(),
    }];

    // Check Rat Race exit
    let finalPlayers = players;
    let winnerId = game.winnerId;
    if (checkRatRaceExit(updatedPlayer, savingsRate)) {
      // Exit handled by turn engine on next PayDay, but flag here too
    }

    const newState: GameState = {
      ...game,
      players: finalPlayers,
      pendingEvent: null,
      log,
      winnerId,
    };
    set({ game: newState });
    get().saveGame();
  },

  skipDeal: () => {
    const { game } = get();
    if (!game) return;
    set({ game: { ...game, pendingEvent: null } });
  },

  acceptMarket: (card) => {
    const { game } = get();
    if (!game) return;
    const newState = applyMarketCard({ ...game, pendingEvent: null }, card);
    const log = [...newState.log, {
      turn: newState.turnNumber,
      playerId: '',
      message: `Рынок: ${card.title} — ${card.description}`,
      timestamp: Date.now(),
    }];
    set({ game: { ...newState, log } });
    get().saveGame();
  },

  payDoodad: (cost, useLoan) => {
    const { game, savingsRate } = get();
    if (!game) return;
    const idx = game.currentPlayerIndex;
    let player = game.players[idx];

    if (useLoan) {
      player = applyBankLoan(player, Math.ceil(cost / 1000) * 1000);
    }
    player = {
      ...player,
      balance: { ...player.balance, savings: player.balance.savings - cost },
    };

    const log = [...game.log, {
      turn: game.turnNumber,
      playerId: player.id,
      message: `${player.name} заплатил(а) $${cost.toLocaleString('ru')} (мелкие расходы)${useLoan ? ' (кредит)' : ''}`,
      timestamp: Date.now(),
    }];

    const players = game.players.map((p, i) => (i === idx ? player : p));
    set({ game: { ...game, players, pendingEvent: null, log } });
    get().saveGame();
  },

  doCharity: (accept) => {
    const { game } = get();
    if (!game) return;
    const idx = game.currentPlayerIndex;
    let player = game.players[idx];
    const log = [...game.log];

    if (accept) {
      const donation = Math.floor((player.income.salary) * CONFIG.CHARITY_PAYOUT_FRACTION);
      player = {
        ...player,
        balance: { ...player.balance, savings: player.balance.savings - donation },
        charityTurnsLeft: CONFIG.CHARITY_DICE_CHOICE_TURNS,
      };
      log.push({
        turn: game.turnNumber,
        playerId: player.id,
        message: `${player.name} пожертвовал(а) $${donation.toLocaleString('ru')} на благотворительность (+${CONFIG.CHARITY_DICE_CHOICE_TURNS} хода с выбором кубиков)`,
        timestamp: Date.now(),
      });
    }

    const players = game.players.map((p, i) => (i === idx ? player : p));
    set({ game: { ...game, players, pendingEvent: null, log } });
    get().saveGame();
  },

  addBaby: () => {
    const { game } = get();
    if (!game) return;
    const idx = game.currentPlayerIndex;
    const player = game.players[idx];
    if (player.numChildren >= CONFIG.MAX_CHILDREN) return;

    const prof = PROFESSIONS.find((p) => p.id === player.professionId);
    const perChild = prof?.income.perChildExpense ?? 200;
    const newChildren = player.numChildren + 1;

    const updatedPlayer: Player = {
      ...player,
      numChildren: newChildren,
      income: {
        ...player.income,
        childExpenses: newChildren * perChild,
      },
    };

    const log = [...game.log, {
      turn: game.turnNumber,
      playerId: player.id,
      message: `${player.name} стал(а) родителем! Детей: ${newChildren}. +$${perChild.toLocaleString('ru')}/мес расходов`,
      timestamp: Date.now(),
    }];

    const players = game.players.map((p, i) => (i === idx ? updatedPlayer : p));
    set({ game: { ...game, players, pendingEvent: null, log } });
    get().saveGame();
  },

  applyDownsized: () => {
    const { game, savingsRate } = get();
    if (!game) return;
    const idx = game.currentPlayerIndex;
    let player = game.players[idx];
    const { player: paid, amount } = applyPayday(player, savingsRate);
    player = {
      ...paid,
      downsizedTurnsLeft: CONFIG.DOWNSIZED_TURNS_SKIPPED,
    };

    const log = [...game.log, {
      turn: game.turnNumber,
      playerId: player.id,
      message: `${player.name} сокращён(а)! Заплатил(а) $${Math.abs(amount).toLocaleString('ru')} и пропустит ${CONFIG.DOWNSIZED_TURNS_SKIPPED} хода`,
      timestamp: Date.now(),
    }];

    const players = game.players.map((p, i) => (i === idx ? player : p));
    set({ game: { ...game, players, pendingEvent: null, log } });
    get().saveGame();
  },

  takeBankLoan: (amount) => {
    const { game } = get();
    if (!game) return;
    const idx = game.currentPlayerIndex;
    const player = applyBankLoan(game.players[idx], amount);
    const log = [...game.log, {
      turn: game.turnNumber,
      playerId: player.id,
      message: `${player.name} взял(а) банковский заём: $${amount.toLocaleString('ru')}`,
      timestamp: Date.now(),
    }];
    const players = game.players.map((p, i) => (i === idx ? player : p));
    set({ game: { ...game, players, log } });
    get().saveGame();
  },

  repayLoan: (amount) => {
    const { game } = get();
    if (!game) return;
    const idx = game.currentPlayerIndex;
    const player = repayBankLoan(game.players[idx], amount);
    const log = [...game.log, {
      turn: game.turnNumber,
      playerId: player.id,
      message: `${player.name} погасил(а) банковский заём: $${amount.toLocaleString('ru')}`,
      timestamp: Date.now(),
    }];
    const players = game.players.map((p, i) => (i === idx ? player : p));
    set({ game: { ...game, players, log } });
    get().saveGame();
  },

  endTurn: () => {
    const { game } = get();
    if (!game) return;
    const newState = advanceTurn(game);
    set({ game: newState });
    get().saveGame();
  },

  saveGame: async () => {
    const { game } = get();
    if (!game) return;
    try {
      await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(game));
    } catch (_) {}
  },

  loadGame: async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVE_KEY);
      if (raw) {
        const game: GameState = JSON.parse(raw);
        set({ game });
      }
    } catch (_) {}
  },

  clearGame: () => {
    set({ game: null });
    AsyncStorage.removeItem(SAVE_KEY);
  },
}));
