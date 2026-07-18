import type { Player, Deal, RealEstateAsset, BusinessAsset, StockHolding } from '../types';
import { calcPassiveIncome, syncPassiveIncomeFields } from './financials';

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

/** Returns true if player can afford the down payment */
export function canAffordDeal(player: Player, deal: Deal): boolean {
  return player.balance.savings >= deal.downPayment;
}

/** Apply a stock deal purchase to the player */
function buyStocks(player: Player, deal: Deal): Player {
  if (!deal.ticker || !deal.shares || !deal.pricePerShare) return player;

  const existing = player.balance.stocks.find((h) => h.ticker === deal.ticker);
  let updatedStocks: StockHolding[];

  if (existing) {
    // average cost basis
    const totalShares = existing.shares + deal.shares;
    const avgPrice = (existing.shares * existing.avgPrice + deal.shares * deal.pricePerShare) / totalShares;
    updatedStocks = player.balance.stocks.map((h) =>
      h.ticker === deal.ticker ? { ...h, shares: totalShares, avgPrice } : h
    );
  } else {
    updatedStocks = [
      ...player.balance.stocks,
      {
        id: uid(),
        ticker: deal.ticker,
        shares: deal.shares,
        avgPrice: deal.pricePerShare,
        dividendPerShare: deal.dividendPerShare ?? 0,
      },
    ];
  }

  return {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings - deal.downPayment,
      stocks: updatedStocks,
    },
  };
}

/** Sell some or all shares of a stock at the given market price */
export function sellStocks(
  player: Player,
  ticker: string,
  sharesToSell: number,
  marketPrice: number,
  savingsRate: number
): Player {
  const holding = player.balance.stocks.find((h) => h.ticker === ticker);
  if (!holding) return player;

  const actualShares = Math.min(sharesToSell, holding.shares);
  const proceeds = actualShares * marketPrice;
  let updatedStocks: StockHolding[];

  if (actualShares >= holding.shares) {
    updatedStocks = player.balance.stocks.filter((h) => h.ticker !== ticker);
  } else {
    updatedStocks = player.balance.stocks.map((h) =>
      h.ticker === ticker ? { ...h, shares: h.shares - actualShares } : h
    );
  }

  const updated: Player = {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings + proceeds,
      stocks: updatedStocks,
    },
  };

  return syncPassiveIncomeFields(updated, savingsRate);
}

/** Apply a real-estate deal */
function buyRealEstate(player: Player, deal: Deal): Player {
  const asset: RealEstateAsset = {
    id: uid(),
    name: deal.title,
    purchasePrice: deal.price,
    downPayment: deal.downPayment,
    mortgageBalance: deal.loanAmount,
    monthlyFlow: deal.monthlyFlow,
    priceRange: deal.priceRange ?? [deal.price * 0.7, deal.price * 1.4],
    dealCardId: deal.id,
  };

  return {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings - deal.downPayment,
      realEstate: [...player.balance.realEstate, asset],
      investmentMortgages: player.balance.investmentMortgages + deal.loanAmount,
    },
  };
}

/** Apply a business deal */
function buyBusiness(player: Player, deal: Deal): Player {
  const asset: BusinessAsset = {
    id: uid(),
    name: deal.title,
    purchasePrice: deal.price,
    downPayment: deal.downPayment,
    loanBalance: deal.loanAmount,
    monthlyFlow: deal.monthlyFlow,
    dealCardId: deal.id,
  };

  return {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings - deal.downPayment,
      businesses: [...player.balance.businesses, asset],
    },
  };
}

/** Apply a partnership or gold deal (treated like a business with no loan) */
function buyOther(player: Player, deal: Deal): Player {
  // Store as a business asset for simplicity
  const asset: BusinessAsset = {
    id: uid(),
    name: deal.title,
    purchasePrice: deal.price,
    downPayment: deal.downPayment,
    loanBalance: 0,
    monthlyFlow: deal.monthlyFlow,
    dealCardId: deal.id,
  };

  return {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings - deal.downPayment,
      businesses: [...player.balance.businesses, asset],
    },
  };
}

/** Apply any deal purchase and sync passive income fields */
export function applyDeal(player: Player, deal: Deal, savingsRate: number): Player {
  let updated: Player;
  switch (deal.type) {
    case 'stock':
      updated = buyStocks(player, deal);
      break;
    case 'real-estate':
      updated = buyRealEstate(player, deal);
      break;
    case 'business':
    case 'partnership':
    case 'gold':
      updated = deal.loanAmount > 0 ? buyBusiness(player, deal) : buyOther(player, deal);
      break;
    default:
      updated = player;
  }
  return syncPassiveIncomeFields(updated, savingsRate);
}

/** Sell a real-estate asset at given price */
export function sellRealEstate(
  player: Player,
  assetId: string,
  salePrice: number,
  savingsRate: number
): Player {
  const asset = player.balance.realEstate.find((r) => r.id === assetId);
  if (!asset) return player;

  const proceeds = salePrice - asset.mortgageBalance;

  const updated: Player = {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings + proceeds,
      realEstate: player.balance.realEstate.filter((r) => r.id !== assetId),
      investmentMortgages: player.balance.investmentMortgages - asset.mortgageBalance,
    },
  };

  return syncPassiveIncomeFields(updated, savingsRate);
}

/** Sell a business asset */
export function sellBusiness(
  player: Player,
  assetId: string,
  salePrice: number,
  savingsRate: number
): Player {
  const asset = player.balance.businesses.find((b) => b.id === assetId);
  if (!asset) return player;

  const proceeds = salePrice - asset.loanBalance;

  const updated: Player = {
    ...player,
    balance: {
      ...player.balance,
      savings: player.balance.savings + proceeds,
      businesses: player.balance.businesses.filter((b) => b.id !== assetId),
    },
  };

  return syncPassiveIncomeFields(updated, savingsRate);
}
