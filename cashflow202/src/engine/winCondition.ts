import type { Player } from '../types';
import { calcPassiveIncome, calcTotalExpenses } from './financials';
import { CONFIG } from '../data/config';

/** Has this player qualified to exit the Rat Race? */
export function checkRatRaceExit(player: Player, savingsRate: number): boolean {
  if (player.onFastTrack) return false;
  const passive = calcPassiveIncome(player, savingsRate);
  const expenses = calcTotalExpenses(player);
  return passive > expenses;
}

/**
 * Calculate the "buyout" income — starting monthly income on the Fast Track.
 * Buyout = 100 × passive income.
 */
export function calcBuyout(player: Player, savingsRate: number): number {
  return calcPassiveIncome(player, savingsRate) * CONFIG.BUYOUT_MULTIPLIER;
}

/**
 * Has this Fast Track player won?
 * Win if cashflow >= fastTrackStartIncome + 50,000 OR owns their dream.
 */
export function checkFastTrackWin(
  player: Player,
  hasDream: boolean
): boolean {
  if (!player.onFastTrack) return false;
  if (hasDream) return true;
  // +50k above start
  return player.income.salary >= player.fastTrackStartIncome + CONFIG.FAST_TRACK_CASHFLOW_BONUS;
}

/**
 * Transition a player from Rat Race to Fast Track.
 * Sets salary to buyout value, resets position, sets onFastTrack.
 */
export function exitRatRace(player: Player, savingsRate: number): Player {
  const buyout = calcBuyout(player, savingsRate);
  return {
    ...player,
    onFastTrack: true,
    position: 0,
    fastTrackStartIncome: buyout,
    income: {
      ...player.income,
      salary: buyout,
    },
  };
}
