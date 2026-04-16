import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Глоссарий: CRM, HoReCa, SaaS и другие термины",
  description:
    "Глоссарий терминов: CRM, SaaS, HoReCa, MVP, DCA и другие понятия из мира бизнеса и технологий.",
  alternates: { canonical: "https://raducan.pro/glossary" },
};

const termsRu = [
  {
    term: "CRM",
    definition:
      "Customer Relationship Management — система управления взаимоотношениями с клиентами. Помогает вести базу клиентов, отслеживать взаимодействия и автоматизировать продажи.",
  },
  {
    term: "DCA",
    definition:
      "Dollar Cost Averaging — стратегия регулярных инвестиций фиксированной суммы, независимо от текущей цены актива. Снижает влияние волатильности.",
  },
  {
    term: "HoReCa",
    definition:
      "Hotel, Restaurant, Catering — сегмент индустрии гостеприимства, включающий гостиницы, рестораны, кафе, бары и кальянные.",
  },
  {
    term: "MVP",
    definition:
      "Minimum Viable Product — минимально жизнеспособный продукт. Версия с базовым функционалом для проверки гипотезы и получения обратной связи.",
  },
  {
    term: "ROI",
    definition:
      "Return on Investment — коэффициент возврата инвестиций. Показывает, сколько прибыли приносит каждый вложенный рубль.",
  },
  {
    term: "SaaS",
    definition:
      "Software as a Service — модель распространения ПО по подписке. Пользователь платит ежемесячно за доступ к облачному сервису.",
  },
  {
    term: "API",
    definition:
      "Application Programming Interface — интерфейс для взаимодействия программ между собой. Позволяет интегрировать разные сервисы.",
  },
  {
    term: "SEO",
    definition:
      "Search Engine Optimization — оптимизация сайта для поисковых систем. Цель — получить органический трафик из Google и Яндекс.",
  },
  {
    term: "SSG",
    definition:
      "Static Site Generation — генерация HTML-страниц на этапе сборки. Быстрая загрузка и хороший SEO.",
  },
  {
    term: "Портфель",
    definition:
      "Набор инвестиционных активов (акции, облигации, криптовалюта), объединённых в одну группу для отслеживания и анализа.",
  },
];

const termsEn = [
  {
    term: "CRM",
    definition:
      "Customer Relationship Management — a system for managing customer relationships. Helps maintain a client database, track interactions, and automate sales.",
  },
  {
    term: "DCA",
    definition:
      "Dollar Cost Averaging — a strategy of regularly investing a fixed amount regardless of the current asset price. Reduces the impact of volatility.",
  },
  {
    term: "HoReCa",
    definition:
      "Hotel, Restaurant, Catering — a hospitality industry segment that includes hotels, restaurants, cafes, bars, and hookah lounges.",
  },
  {
    term: "MVP",
    definition:
      "Minimum Viable Product — a product version with basic functionality for testing a hypothesis and gathering feedback.",
  },
  {
    term: "ROI",
    definition:
      "Return on Investment — a ratio measuring the profitability of an investment. Shows how much profit each invested unit generates.",
  },
  {
    term: "SaaS",
    definition:
      "Software as a Service — a subscription-based software distribution model. Users pay monthly for access to a cloud service.",
  },
  {
    term: "API",
    definition:
      "Application Programming Interface — an interface for programs to interact with each other. Enables integration of different services.",
  },
  {
    term: "SEO",
    definition:
      "Search Engine Optimization — optimizing a website for search engines. The goal is to get organic traffic from Google and other search engines.",
  },
  {
    term: "SSG",
    definition:
      "Static Site Generation — generating HTML pages at build time. Fast loading and good SEO.",
  },
  {
    term: "Portfolio",
    definition:
      "A collection of investment assets (stocks, bonds, cryptocurrency) grouped together for tracking and analysis.",
  },
];

const contentRu = {
  heading: "Глоссарий",
  subtitle: "Термины из мира бизнеса, технологий и инвестиций.",
};

const contentEn = {
  heading: "Glossary",
  subtitle: "Terms from the world of business, technology, and investments.",
};

export default async function GlossaryPage() {
  const locale = await getLocale();
  const terms = locale === "ru" ? termsRu : termsEn;
  const c = locale === "ru" ? contentRu : contentEn;

  const alphabet = [...new Set(terms.map((t) => t.term[0]))].sort();

  return (
    <AnimatedSection className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">
        {c.heading}
      </h1>
      <p className="mt-4 text-lg text-muted">
        {c.subtitle}
      </p>

      {/* Alphabet nav */}
      <div className="mt-8 flex flex-wrap gap-2">
        {alphabet.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="flex h-10 w-10 items-center justify-center border border-gold-border text-sm font-medium text-gold hover:bg-gold-dim transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="mt-12 space-y-6">
        {terms.map((item) => (
          <div
            key={item.term}
            id={item.term[0]}
            className="border border-gold-border bg-surface p-6"
          >
            <h3 className="font-heading text-lg font-bold text-gold">
              {item.term}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
