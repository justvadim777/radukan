export interface StockDefinition {
  ticker: string;
  name: string;
  startPrice: number;
  dividendPerShare: number; // annual dividend per share
  priceRange: [number, number];
  description: string;
}

export const STOCKS: StockDefinition[] = [
  {
    ticker: 'MYT4U',
    name: 'MYT4U Corp.',
    startPrice: 5,
    dividendPerShare: 0.5,
    priceRange: [2, 8],
    description: 'Дешёвая акция с небольшим дивидендом. Хороша для покупки внизу диапазона.',
  },
  {
    ticker: 'OK4U',
    name: 'OK4U Inc.',
    startPrice: 20,
    dividendPerShare: 0,
    priceRange: [5, 30],
    description: 'Ростовая акция без дивидендов. Широкий диапазон — высокая волатильность.',
  },
  {
    ticker: 'GRO4US',
    name: 'GRO4US Ltd.',
    startPrice: 10,
    dividendPerShare: 0,
    priceRange: [3, 15],
    description: 'Рост-акция. Диапазон умеренный, дивидендов нет.',
  },
  {
    ticker: 'ON2U',
    name: 'ON2U Technologies',
    startPrice: 15,
    dividendPerShare: 1.0,
    priceRange: [8, 25],
    description: 'Стабильная акция с хорошим дивидендом.',
  },
  {
    ticker: '2BIG',
    name: '2BIG Industries',
    startPrice: 8,
    dividendPerShare: 0,
    priceRange: [1, 20],
    description: 'Очень волатильная акция. Огромный диапазон — высокий риск и потенциал.',
  },
];
