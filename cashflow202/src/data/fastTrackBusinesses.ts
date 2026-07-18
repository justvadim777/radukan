import type { FastTrackBusiness } from '../types';

export const FAST_TRACK_BUSINESSES: FastTrackBusiness[] = [
  {
    id: 'ft-biz-hotel-chain',
    name: 'Сеть отелей',
    description: 'Международная гостиничная сеть в 3 странах.',
    cost: 500_000,
    monthlyFlow: 25_000,
  },
  {
    id: 'ft-biz-tech-company',
    name: 'IT-компания',
    description: 'SaaS-платформа для среднего бизнеса.',
    cost: 300_000,
    monthlyFlow: 15_000,
  },
  {
    id: 'ft-biz-real-estate-fund',
    name: 'Инвест-фонд недвижимости',
    description: 'Портфель коммерческой недвижимости.',
    cost: 400_000,
    monthlyFlow: 20_000,
  },
  {
    id: 'ft-biz-franchise-chain',
    name: 'Сеть ресторанов (франшиза)',
    description: '12 заведений по всей стране.',
    cost: 250_000,
    monthlyFlow: 12_000,
  },
  {
    id: 'ft-biz-media',
    name: 'Медиакомпания',
    description: 'YouTube-канал + подкаст + онлайн-курсы.',
    cost: 100_000,
    monthlyFlow: 8_000,
  },
  {
    id: 'ft-biz-energy',
    name: 'Солнечные электростанции',
    description: '3 солнечные фермы, долгосрочные контракты.',
    cost: 600_000,
    monthlyFlow: 30_000,
  },
];
