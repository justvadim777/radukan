import type { GameState, Player, PendingEvent, LogEntry, MarketCard } from '../types';
import { RAT_RACE_BOARD, FAST_TRACK_BOARD, rollDice } from './board';
import { calcCashflow, calcPassiveIncome, calcTotalExpenses } from './financials';
import { checkRatRaceExit, exitRatRace, checkFastTrackWin } from './winCondition';
import { handleBankruptcy } from './bankruptcy';
import { checkExpirations } from './options';
import { CONFIG } from '../data/config';
import { FAST_TRACK_BUSINESSES } from '../data/fastTrackBusinesses';

/** Apply PayDay: add cashflow to savings (or deduct if negative) */
export function applyPayday(player: Player, savingsRate: number): { player: Player; amount: number } {
  const cf = calcCashflow(player, savingsRate);
  const updated: Player = {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings + cf,
    },
  };
  return { player: updated, amount: cf };
}

/** Apply market card effects to game state */
export function applyMarketCard(state: GameState, card: MarketCard): GameState {
  let stockPrices = { ...state.stockPrices };
  const messages: string[] = [];

  if (card.ticker && card.newStockPrice !== undefined) {
    stockPrices = { ...stockPrices, [card.ticker]: card.newStockPrice };
    messages.push(`Цена ${card.ticker}: $${card.newStockPrice}`);
  }

  // Check expirations for all players after price change
  let players = state.players.map((p) => {
    if (p.isEliminated) return p;
    const result = checkExpirations(p, state.turnNumber, stockPrices);
    if (result.messages.length > 0) {
      // Messages will be added to log by caller
    }
    return result.player;
  });

  return { ...state, stockPrices, players };
}

/** Roll dice for current player and advance their position */
export function rollAndMove(
  state: GameState,
  rng: () => number
): GameState {
  const player = state.players[state.currentPlayerIndex];
  if (!player || player.isEliminated) return advanceTurn(state);

  const diceCount = player.onFastTrack ? 2 :
    (player.charityTurnsLeft > 0 ? (1 as 1 | 2) : (1 as 1 | 2));
  const roll = rollDice(diceCount, rng);

  if (player.onFastTrack) {
    return handleFastTrackMove(state, roll);
  } else {
    return handleRatRaceMove(state, roll);
  }
}

function handleRatRaceMove(state: GameState, roll: number): GameState {
  const playerIdx = state.currentPlayerIndex;
  const player = state.players[playerIdx];

  const boardSize = RAT_RACE_BOARD.length;
  const newPos = (player.position + roll) % boardSize;
  const passedPayday = (player.position + roll) >= boardSize;

  let updatedPlayer: Player = { ...player, position: newPos };

  const newLog: LogEntry[] = [{
    turn: state.turnNumber,
    playerId: player.id,
    message: `${player.name} бросил(а) кубик: ${roll}. Клетка: ${RAT_RACE_BOARD[newPos].label}`,
    timestamp: Date.now(),
  }];

  // Handle passing PayDay
  if (passedPayday) {
    const { player: paid, amount } = applyPayday(updatedPlayer, CONFIG.SAVINGS_ANNUAL_INTEREST_RATE);
    updatedPlayer = paid;
    newLog.push({
      turn: state.turnNumber,
      playerId: player.id,
      message: amount >= 0
        ? `${player.name} получил(а) расчётный день: +$${amount.toLocaleString('ru')}`
        : `${player.name} заплатил(а) банку: $${Math.abs(amount).toLocaleString('ru')}`,
      timestamp: Date.now(),
    });
    if (updatedPlayer.balance.savings < 0) {
      updatedPlayer = handleBankruptcy(updatedPlayer, CONFIG.SAVINGS_ANNUAL_INTEREST_RATE);
      newLog.push({
        turn: state.turnNumber,
        playerId: player.id,
        message: updatedPlayer.isEliminated
          ? `${player.name} обанкротился(ась) и выбыл(а) из игры!`
          : `${player.name} прошёл(а) через банкротство, но восстановился(ась).`,
        timestamp: Date.now(),
      });
    }
  }

  // Check for Rat Race exit after any payday
  if (!updatedPlayer.isEliminated && checkRatRaceExit(updatedPlayer, CONFIG.SAVINGS_ANNUAL_INTEREST_RATE)) {
    updatedPlayer = exitRatRace(updatedPlayer, CONFIG.SAVINGS_ANNUAL_INTEREST_RATE);
    newLog.push({
      turn: state.turnNumber,
      playerId: player.id,
      message: `🎉 ${player.name} вырвался(ась) из Крысиных бегов! Выкуп: $${updatedPlayer.income.salary.toLocaleString('ru')}/мес`,
      timestamp: Date.now(),
    });
  }

  const cell = RAT_RACE_BOARD[newPos];
  let pendingEvent: PendingEvent | null = null;

  if (!updatedPlayer.isEliminated && !updatedPlayer.onFastTrack) {
    switch (cell.type) {
      case 'payday': {
        const { player: paid, amount } = applyPayday(updatedPlayer, CONFIG.SAVINGS_ANNUAL_INTEREST_RATE);
        updatedPlayer = paid;
        newLog.push({
          turn: state.turnNumber,
          playerId: player.id,
          message: `${player.name} попал(а) на Расчётный день: ${amount >= 0 ? '+' : ''}$${amount.toLocaleString('ru')}`,
          timestamp: Date.now(),
        });
        break;
      }
      case 'opportunity': {
        pendingEvent = { type: 'deal-offer' };
        break;
      }
      case 'market': {
        if (state.marketDeck.length > 0) {
          const card = state.marketDeck[0];
          pendingEvent = { type: 'market-event', marketCard: card };
        }
        break;
      }
      case 'doodad': {
        if (state.doodadDeck.length > 0) {
          const dd = state.doodadDeck[0];
          pendingEvent = { type: 'doodad', doodad: dd, doodadCost: dd.cost };
        }
        break;
      }
      case 'charity': {
        pendingEvent = { type: 'charity' };
        break;
      }
      case 'baby': {
        if (updatedPlayer.numChildren < CONFIG.MAX_CHILDREN) {
          pendingEvent = { type: 'baby' };
        } else {
          newLog.push({
            turn: state.turnNumber,
            playerId: player.id,
            message: `${player.name} попал(а) на клетку «Ребёнок», но уже максимум (3 детей).`,
            timestamp: Date.now(),
          });
        }
        break;
      }
      case 'downsized': {
        pendingEvent = { type: 'downsized' };
        break;
      }
    }
  }

  const updatedPlayers = state.players.map((p, i) =>
    i === playerIdx ? updatedPlayer : p
  );

  const winnerCheck = updatedPlayers.find((p) => p.isEliminated === false && false); // handled below

  return {
    ...state,
    players: updatedPlayers,
    pendingEvent,
    log: [...state.log, ...newLog],
    winnerId: null,
  };
}

function handleFastTrackMove(state: GameState, roll: number): GameState {
  const playerIdx = state.currentPlayerIndex;
  const player = state.players[playerIdx];

  const boardSize = FAST_TRACK_BOARD.length;
  const newPos = (player.position + roll) % boardSize;
  const passedCashflowDay = (player.position + roll) >= boardSize;

  let updatedPlayer: Player = { ...player, position: newPos };
  const newLog: LogEntry[] = [{
    turn: state.turnNumber,
    playerId: player.id,
    message: `${player.name} на Скоростной дорожке, бросил(а): ${roll}. Клетка: ${FAST_TRACK_BOARD[newPos].label}`,
    timestamp: Date.now(),
  }];

  if (passedCashflowDay) {
    const fastCF = updatedPlayer.income.salary;
    updatedPlayer = {
      ...updatedPlayer,
      balance: { ...updatedPlayer.balance, savings: updatedPlayer.balance.savings + fastCF },
    };
    newLog.push({
      turn: state.turnNumber,
      playerId: player.id,
      message: `${player.name} прошёл(а) День денежного потока: +$${fastCF.toLocaleString('ru')}`,
      timestamp: Date.now(),
    });
  }

  const cell = FAST_TRACK_BOARD[newPos];
  let pendingEvent: PendingEvent | null = null;
  let winnerId = state.winnerId;

  switch (cell.type) {
    case 'cashflow-day': {
      const fastCF = updatedPlayer.income.salary;
      updatedPlayer = {
        ...updatedPlayer,
        balance: { ...updatedPlayer.balance, savings: updatedPlayer.balance.savings + fastCF },
      };
      newLog.push({
        turn: state.turnNumber,
        playerId: player.id,
        message: `${player.name} получил(а) День денежного потока: +$${fastCF.toLocaleString('ru')}`,
        timestamp: Date.now(),
      });
      break;
    }
    case 'business': {
      if (cell.businessId) {
        const biz = FAST_TRACK_BUSINESSES.find((b) => b.id === cell.businessId);
        if (biz && updatedPlayer.balance.savings >= biz.cost) {
          updatedPlayer = {
            ...updatedPlayer,
            balance: { ...updatedPlayer.balance, savings: updatedPlayer.balance.savings - biz.cost },
            income: { ...updatedPlayer.income, salary: updatedPlayer.income.salary + biz.monthlyFlow },
          };
          newLog.push({
            turn: state.turnNumber,
            playerId: player.id,
            message: `${player.name} купил(а) бизнес «${biz.name}» за $${biz.cost.toLocaleString('ru')}. +$${biz.monthlyFlow.toLocaleString('ru')}/мес`,
            timestamp: Date.now(),
          });
          // Check win
          if (checkFastTrackWin(updatedPlayer, false)) {
            winnerId = updatedPlayer.id;
            newLog.push({
              turn: state.turnNumber,
              playerId: player.id,
              message: `🏆 ${player.name} ПОБЕДИЛ(А)! Достигнут целевой доход!`,
              timestamp: Date.now(),
            });
          }
        }
      }
      break;
    }
    case 'dream': {
      // Prompt to buy dream
      pendingEvent = { type: 'deal-offer' }; // simplified — handled by UI
      break;
    }
    case 'tax-audit': {
      const penalty = Math.floor(updatedPlayer.balance.savings * 0.5);
      updatedPlayer = {
        ...updatedPlayer,
        balance: { ...updatedPlayer.balance, savings: updatedPlayer.balance.savings - penalty },
      };
      newLog.push({
        turn: state.turnNumber,
        playerId: player.id,
        message: `${player.name} попал(а) под налоговую проверку! −$${penalty.toLocaleString('ru')}`,
        timestamp: Date.now(),
      });
      break;
    }
    case 'divorce': {
      const lost = updatedPlayer.balance.savings;
      updatedPlayer = {
        ...updatedPlayer,
        balance: { ...updatedPlayer.balance, savings: 0 },
      };
      newLog.push({
        turn: state.turnNumber,
        playerId: player.id,
        message: `${player.name} развёлся(ась)! Потеряно $${lost.toLocaleString('ru')} наличных.`,
        timestamp: Date.now(),
      });
      break;
    }
    case 'lawsuit': {
      const penalty = Math.floor(updatedPlayer.balance.savings * 0.5);
      updatedPlayer = {
        ...updatedPlayer,
        balance: { ...updatedPlayer.balance, savings: updatedPlayer.balance.savings - penalty },
      };
      newLog.push({
        turn: state.turnNumber,
        playerId: player.id,
        message: `${player.name} проиграл(а) судебный иск! −$${penalty.toLocaleString('ru')}`,
        timestamp: Date.now(),
      });
      break;
    }
    case 'charity': {
      pendingEvent = { type: 'charity' };
      break;
    }
  }

  const updatedPlayers = state.players.map((p, i) =>
    i === playerIdx ? updatedPlayer : p
  );

  return {
    ...state,
    players: updatedPlayers,
    pendingEvent,
    log: [...state.log, ...newLog],
    winnerId,
  };
}

/** Advance to the next non-eliminated, non-downsized player */
export function advanceTurn(state: GameState): GameState {
  const total = state.players.length;
  let nextIdx = (state.currentPlayerIndex + 1) % total;
  let checked = 0;

  while (checked < total) {
    const p = state.players[nextIdx];
    if (!p.isEliminated) {
      if (p.downsizedTurnsLeft > 0) {
        // Decrement but skip
        const updatedPlayers = state.players.map((pl, i) =>
          i === nextIdx ? { ...pl, downsizedTurnsLeft: pl.downsizedTurnsLeft - 1 } : pl
        );
        return {
          ...state,
          players: updatedPlayers,
          currentPlayerIndex: nextIdx,
          turnNumber: state.turnNumber + 1,
          pendingEvent: null,
        };
      }
      break;
    }
    nextIdx = (nextIdx + 1) % total;
    checked++;
  }

  return {
    ...state,
    currentPlayerIndex: nextIdx,
    turnNumber: state.turnNumber + 1,
    pendingEvent: null,
  };
}
