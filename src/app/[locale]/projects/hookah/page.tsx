import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Raducan Hookah — CRM для кальянных и HoReCa",
  description:
    "Облачная CRM для кальянных. Учёт гостей, бронирования, программа лояльности и аналитика — всё в одном месте.",
  alternates: { canonical: "https://raducan.pro/projects/hookah" },
};

const features = [
  {
    icon: (
      <svg className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "База гостей",
    text: "История визитов, предпочтения, дни рождения. Знайте каждого гостя в лицо.",
  },
  {
    icon: (
      <svg className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Бронирование",
    text: "Столы, кальяны, зоны. Онлайн и через администратора. Уведомления в Telegram.",
  },
  {
    icon: (
      <svg className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Лояльность",
    text: "Бонусная система, скидки постоянникам, VIP-статусы. Гости возвращаются.",
  },
  {
    icon: (
      <svg className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: "Склад",
    text: "Учёт табака, углей, расходников. Автоматические остатки и уведомления о закупке.",
  },
  {
    icon: (
      <svg className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Аналитика",
    text: "Выручка, средний чек, загруженность по часам. Полная картина бизнеса.",
  },
  {
    icon: (
      <svg className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21.5 2h-19A1.5 1.5 0 0 0 1 3.5v17A1.5 1.5 0 0 0 2.5 22H12a10 10 0 0 0 10-10V3.5A1.5 1.5 0 0 0 21.5 2z" />
        <path d="m22 8-5-5" />
      </svg>
    ),
    title: "Telegram",
    text: "Уведомления о бронях, отчёты и управление прямо в мессенджере.",
  },
];

const plans = [
  {
    name: "Старт",
    price: "Free",
    period: "навсегда",
    features: ["До 100 гостей", "Бронирование", "Базовая аналитика", "1 пользователь"],
    cta: "Начать",
    featured: false,
  },
  {
    name: "Базовый",
    price: "299",
    currency: "₽",
    period: "в месяц",
    features: ["До 500 гостей", "Программа лояльности", "Учёт склада", "3 пользователя"],
    cta: "Выбрать",
    featured: false,
  },
  {
    name: "Профи",
    price: "599",
    currency: "₽",
    period: "в месяц",
    features: ["Без ограничений", "Telegram-уведомления", "Полная аналитика", "10 пользователей"],
    cta: "Попробовать",
    featured: true,
  },
  {
    name: "Сеть",
    price: "999",
    currency: "₽",
    period: "в месяц",
    features: ["Несколько заведений", "API интеграции", "Приоритетная поддержка", "Безлимит"],
    cta: "Связаться",
    featured: false,
  },
];

export default function HookahPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-[60px] pt-[140px] pb-[80px] relative overflow-hidden max-md:px-5 max-md:pt-[120px] max-md:pb-[60px]">
        <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="max-w-[700px]">
          <div className="flex items-center gap-[10px] text-[11px] tracking-[3px] uppercase text-gold mb-5">
            <span className="w-5 h-px bg-gold" />
            Raducan · CRM
          </div>
          <h1
            className="font-heading font-[900] uppercase leading-[1.0] tracking-[-0.5px] mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            <span className="text-gold">Hookah</span>
            <br />
            CRM
          </h1>
          <p className="text-muted text-[17px] leading-[1.7] max-w-[500px]">
            Облачная система управления кальянной. Учёт гостей, бронирования,
            программа лояльности и аналитика в одном месте.
          </p>
        </div>
      </section>

      {/* Features */}
      <AnimatedSection
        className="px-[60px] py-[80px] max-md:px-5 max-md:py-[60px]"
        style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
      >
        <div className="section-label">Возможности</div>
        <h3
          className="font-heading font-bold uppercase tracking-[1px] mb-2"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          Всё что нужно
          <br />
          <span className="text-gold">кальянной</span>
        </h3>
        <div className="grid grid-cols-3 gap-[2px] mt-12 max-md:grid-cols-1">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-surface p-[36px_28px] border border-gold-border-06 transition-all duration-300 hover:border-gold-border hover:bg-surface2"
            >
              <div className="mb-5">{f.icon}</div>
              <div className="font-heading font-semibold text-[15px] uppercase tracking-[1px] mb-2.5">
                {f.title}
              </div>
              <p className="text-muted text-[13px] leading-[1.7]">{f.text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <div className="divider" />

      {/* Pricing */}
      <AnimatedSection className="px-[60px] py-[80px] max-md:px-5 max-md:py-[60px]">
        <div className="section-label">Тарифы</div>
        <h3
          className="font-heading font-bold uppercase tracking-[1px]"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          Выберите план
        </h3>
        <div className="grid grid-cols-4 gap-[2px] mt-12 max-md:grid-cols-1">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-surface p-[36px_28px] border transition-all duration-300 hover:border-gold-border hover:-translate-y-1 ${
                plan.featured
                  ? "bg-surface2 border-gold-border"
                  : "border-gold-border-06"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-px right-5 bg-gold text-bg text-[10px] font-bold tracking-[1.5px] uppercase px-2.5 py-1">
                  Популярный
                </div>
              )}
              <div className="text-[11px] tracking-[2px] uppercase text-muted mb-4">
                {plan.name}
              </div>
              <div className="font-heading font-[900] text-[40px] text-text leading-none mb-1">
                {plan.price}
                {plan.currency && (
                  <span className="text-[18px] text-gold font-semibold">
                    {plan.currency}
                  </span>
                )}
              </div>
              <div className="text-[12px] text-muted mb-7">{plan.period}</div>
              <ul className="list-none mb-8">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-[13px] text-muted py-[7px]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <span className="text-gold text-[10px]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.featured ? (
                <Link
                  href="/contact"
                  className="block text-center bg-gold text-bg px-5 py-3 font-heading font-bold text-[11px] tracking-[2px] uppercase no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                  {plan.cta}
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="block text-center border border-gold-border text-text px-5 py-3 font-heading font-semibold text-[11px] tracking-[2px] uppercase no-underline transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>
    </>
  );
}
