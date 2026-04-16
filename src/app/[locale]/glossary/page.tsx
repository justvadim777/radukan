import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Глоссарий: CRM, HoReCa, SaaS и другие термины",
  description:
    "Глоссарий терминов: CRM, SaaS, HoReCa, MVP, DCA и другие понятия из мира бизнеса и технологий.",
  alternates: { canonical: "https://raducan.pro/glossary" },
};

const terms = [
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

const alphabet = [...new Set(terms.map((t) => t.term[0]))].sort();

export default function GlossaryPage() {
  return (
    <AnimatedSection className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">
        Глоссарий
      </h1>
      <p className="mt-4 text-lg text-muted">
        Термины из мира бизнеса, технологий и инвестиций.
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
