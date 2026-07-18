import type { RatRaceCell, FastTrackCell, RatRaceCellType, FastTrackCellType } from '../types';

// ─── Rat Race board (24 cells) ────────────────────────────────────────────────
// Distribution: 4 paydays, 4 opportunities, 4 markets, 4 doodads,
// 2 charity, 2 baby, 2 downsized, 2 doodad (extra)
// Simplified: follow Cashflow 101/202 canonical arrangement

const RAT_RACE_PATTERN: Array<{ type: RatRaceCellType; label: string }> = [
  { type: 'payday',      label: 'Расчётный день' },
  { type: 'opportunity', label: 'Возможность' },
  { type: 'doodad',      label: 'Мелкие расходы' },
  { type: 'opportunity', label: 'Возможность' },
  { type: 'market',      label: 'Рынок' },
  { type: 'baby',        label: 'Ребёнок' },
  { type: 'opportunity', label: 'Возможность' },
  { type: 'doodad',      label: 'Мелкие расходы' },
  { type: 'payday',      label: 'Расчётный день' },
  { type: 'market',      label: 'Рынок' },
  { type: 'charity',     label: 'Благотворительность' },
  { type: 'opportunity', label: 'Возможность' },
  { type: 'payday',      label: 'Расчётный день' },
  { type: 'doodad',      label: 'Мелкие расходы' },
  { type: 'market',      label: 'Рынок' },
  { type: 'opportunity', label: 'Возможность' },
  { type: 'baby',        label: 'Ребёнок' },
  { type: 'doodad',      label: 'Мелкие расходы' },
  { type: 'payday',      label: 'Расчётный день' },
  { type: 'market',      label: 'Рынок' },
  { type: 'downsized',   label: 'Сокращение' },
  { type: 'opportunity', label: 'Возможность' },
  { type: 'charity',     label: 'Благотворительность' },
  { type: 'downsized',   label: 'Сокращение' },
];

export const RAT_RACE_BOARD: RatRaceCell[] = RAT_RACE_PATTERN.map((cell, index) => ({
  index,
  ...cell,
}));

// ─── Fast Track board (16 cells) ─────────────────────────────────────────────

const FAST_TRACK_PATTERN: Array<{ type: FastTrackCellType; label: string; businessId?: string; dreamId?: string }> = [
  { type: 'cashflow-day', label: 'День денежного потока' },
  { type: 'business',     label: 'Бизнес', businessId: 'ft-biz-tech-company' },
  { type: 'dream',        label: 'Мечта' },
  { type: 'cashflow-day', label: 'День денежного потока' },
  { type: 'business',     label: 'Бизнес', businessId: 'ft-biz-hotel-chain' },
  { type: 'charity',      label: 'Благотворительность' },
  { type: 'dream',        label: 'Мечта' },
  { type: 'cashflow-day', label: 'День денежного потока' },
  { type: 'business',     label: 'Бизнес', businessId: 'ft-biz-real-estate-fund' },
  { type: 'tax-audit',    label: 'Налоговая проверка' },
  { type: 'dream',        label: 'Мечта' },
  { type: 'cashflow-day', label: 'День денежного потока' },
  { type: 'business',     label: 'Бизнес', businessId: 'ft-biz-franchise-chain' },
  { type: 'divorce',      label: 'Развод' },
  { type: 'dream',        label: 'Мечта' },
  { type: 'lawsuit',      label: 'Судебный иск' },
];

export const FAST_TRACK_BOARD: FastTrackCell[] = FAST_TRACK_PATTERN.map((cell, index) => ({
  index,
  ...cell,
}));

// ─── Movement helpers ─────────────────────────────────────────────────────────

export function moveOnRatRace(currentPos: number, roll: number): { newPos: number; passedPayday: boolean } {
  const size = RAT_RACE_BOARD.length;
  const newPos = (currentPos + roll) % size;
  // Passed payday if we wrapped around or landed on a payday cell that isn't start
  const passedPayday = newPos < currentPos + roll - size + 1 || newPos === currentPos;
  return { newPos, passedPayday: newPos + roll > size - 1 };
}

export function moveOnFastTrack(currentPos: number, roll: number): { newPos: number; passedCashflowDay: boolean } {
  const size = FAST_TRACK_BOARD.length;
  const newPos = (currentPos + roll) % size;
  const passedCashflowDay = newPos + roll >= size;
  return { newPos, passedCashflowDay };
}

export function rollDice(count: 1 | 2, rng: () => number): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(rng() * 6) + 1;
  }
  return total;
}
