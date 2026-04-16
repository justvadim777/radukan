import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Raducan Capital — инвестиционный дашборд",
  description:
    "Тинькофф, БКС, Bybit — единый дашборд для акций, облигаций и криптовалюты.",
  alternates: { canonical: "https://raducan.pro/projects/capital" },
};

const features = [
  {
    icon: "📊",
    title: "Мультипортфельный дашборд",
    text: "Одновременное отслеживание нескольких портфелей у разных брокеров.",
  },
  {
    icon: "💹",
    title: "Акции + облигации + крипто",
    text: "Все активы в единой таблице. Сравнение доходности и диверсификации.",
  },
  {
    icon: "📜",
    title: "История транзакций",
    text: "Полный журнал покупок, продаж и дивидендов с фильтрацией.",
  },
  {
    icon: "🎯",
    title: "Целевой трекер",
    text: "Поставьте финансовую цель и отслеживайте прогресс каждый день.",
  },
  {
    icon: "📈",
    title: "Аналитика",
    text: "Графики доходности, структура портфеля, сравнение с индексом.",
  },
];

const plans = [
  {
    name: "Старт",
    price: "Free",
    period: "навсегда",
    features: ["1 портфель", "Базовая аналитика", "История 30 дней"],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Базовый",
    price: "299 ₽",
    period: "/мес",
    features: ["3 портфеля", "Полная история", "Экспорт в CSV"],
    cta: "Выбрать",
    popular: false,
  },
  {
    name: "Профи",
    price: "599 ₽",
    period: "/мес",
    features: [
      "10 портфелей",
      "Целевой трекер",
      "Продвинутая аналитика",
      "API-доступ",
    ],
    cta: "Попробовать",
    popular: true,
  },
  {
    name: "Премиум",
    price: "999 ₽",
    period: "/мес",
    features: [
      "Безлимит портфелей",
      "Все интеграции",
      "Приоритетная поддержка",
      "White-label",
    ],
    cta: "Связаться",
    popular: false,
  },
];

export default function CapitalPage() {
  return (
    <>
      {/* Hero */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
        <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-gold">
          SaaS · Инвестиции
        </span>
        <h1 className="font-heading text-4xl font-bold md:text-6xl">
          Весь ваш портфель в одном месте
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
          Тинькофф, БКС, Bybit — единый дашборд для акций, облигаций и
          криптовалюты.
        </p>
        <div className="mt-8">
          <Button href="/contact">Попробовать демо</Button>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading title="Функционал" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="border border-gold-border bg-surface p-6 transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading title="Тарифы" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative border bg-surface p-6 ${
                plan.popular
                  ? "border-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                  : "border-gold-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-4 bg-gold px-3 py-1 text-xs font-bold text-bg">
                  Популярный
                </span>
              )}
              <h3 className="font-heading text-lg font-semibold">
                {plan.name}
              </h3>
              <div className="mt-3">
                <span className="font-heading text-3xl font-bold text-gold">
                  {plan.price}
                </span>
                <span className="text-sm text-muted">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-gold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  href="/contact"
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </>
  );
}
