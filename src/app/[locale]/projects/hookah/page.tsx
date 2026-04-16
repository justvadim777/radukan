import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Raducan Hookah — CRM для кальянных и HoReCa",
  description:
    "Облачная CRM для кальянных. Учёт гостей, бронирования, программа лояльности и аналитика — всё в одном месте.",
  alternates: { canonical: "https://raducan.pro/projects/hookah" },
};

const features = [
  {
    icon: "👥",
    title: "База гостей",
    text: "История визитов, предпочтения, дни рождения. Знайте каждого гостя в лицо и возвращайте его снова.",
  },
  {
    icon: "📅",
    title: "Бронирование",
    text: "Столы, кальяны, зоны. Онлайн и через администратора. Автоматические уведомления в Telegram.",
  },
  {
    icon: "⭐",
    title: "Программа лояльности",
    text: "Бонусная система, скидки постоянникам, VIP-статусы. Гости чувствуют себя особенными.",
  },
  {
    icon: "📦",
    title: "Управление складом",
    text: "Учёт табака, углей, расходников. Автоматические остатки и уведомления о необходимости закупки.",
  },
  {
    icon: "📊",
    title: "Аналитика и отчёты",
    text: "Выручка, средний чек, загруженность по часам и дням. Полная картина бизнеса в реальном времени.",
  },
  {
    icon: "📱",
    title: "Telegram-уведомления",
    text: "Уведомления о новых бронях, ежедневные отчёты и управление заведением прямо из мессенджера.",
  },
];

const plans = [
  {
    name: "Старт",
    price: "Free",
    period: "навсегда",
    features: [
      "До 100 гостей",
      "Бронирование",
      "Базовая аналитика",
      "1 пользователь",
    ],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Базовый",
    price: "299 ₽",
    period: "/мес",
    features: [
      "До 500 гостей",
      "Программа лояльности",
      "Учёт склада",
      "3 пользователя",
    ],
    cta: "Выбрать",
    popular: false,
  },
  {
    name: "Профи",
    price: "599 ₽",
    period: "/мес",
    features: [
      "Без ограничений по гостям",
      "Telegram-уведомления",
      "Полная аналитика",
      "10 пользователей",
    ],
    cta: "Попробовать",
    popular: true,
  },
  {
    name: "Сеть",
    price: "999 ₽",
    period: "/мес",
    features: [
      "Несколько заведений",
      "API-интеграции",
      "Приоритетная поддержка",
      "Безлимит",
    ],
    cta: "Связаться",
    popular: false,
  },
];

export default function HookahPage() {
  return (
    <>
      {/* Hero */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
        <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-gold">
          CRM · HoReCa
        </span>
        <h1 className="font-heading text-4xl font-bold md:text-6xl">
          CRM для кальянной
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
          Облачная система управления кальянной. Учёт гостей, бронирования,
          программа лояльности и аналитика — всё в одном месте.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/contact">Попробовать демо</Button>
          <Button href="/contact" variant="secondary">
            Связаться
          </Button>
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

      {/* Case study */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-24">
        <div className="border border-gold-border bg-surface p-8 md:p-12">
          <span className="text-sm font-medium uppercase tracking-wider text-gold">
            Кейс
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold md:text-3xl">
            Остров Lounge, Рига
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Первое заведение на системе Raducan Hookah. Тест-среда для всех
            обновлений платформы. Полный цикл: от учёта гостей до ежедневной
            аналитики в Telegram.
          </p>
        </div>
      </AnimatedSection>
    </>
  );
}
