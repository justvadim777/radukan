import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Raducan Hookah — CRM для кальянных и HoReCa",
  description:
    "Облачная CRM для кальянных. Учёт гостей, бронирования, программа лояльности и аналитика — всё в одном месте.",
  alternates: { canonical: "https://raducan.pro/projects/hookah" },
};

const featureIcons = [
  (
    <svg key="guests" className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  (
    <svg key="booking" className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  (
    <svg key="loyalty" className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  (
    <svg key="inventory" className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  (
    <svg key="analytics" className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  (
    <svg key="telegram" className="w-9 h-9 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21.5 2h-19A1.5 1.5 0 0 0 1 3.5v17A1.5 1.5 0 0 0 2.5 22H12a10 10 0 0 0 10-10V3.5A1.5 1.5 0 0 0 21.5 2z" />
      <path d="m22 8-5-5" />
    </svg>
  ),
];

const featuresRu = [
  { title: "База гостей", text: "История визитов, предпочтения, дни рождения. Знайте каждого гостя в лицо." },
  { title: "Бронирование", text: "Столы, кальяны, зоны. Онлайн и через администратора. Уведомления в Telegram." },
  { title: "Лояльность", text: "Бонусная система, скидки постоянникам, VIP-статусы. Гости возвращаются." },
  { title: "Склад", text: "Учёт табака, углей, расходников. Автоматические остатки и уведомления о закупке." },
  { title: "Аналитика", text: "Выручка, средний чек, загруженность по часам. Полная картина бизнеса." },
  { title: "Telegram", text: "Уведомления о бронях, отчёты и управление прямо в мессенджере." },
];

const featuresEn = [
  { title: "Guest database", text: "Visit history, preferences, birthdays. Know every guest personally." },
  { title: "Reservations", text: "Tables, hookahs, zones. Online and via administrator. Telegram notifications." },
  { title: "Loyalty", text: "Bonus system, discounts for regulars, VIP statuses. Guests keep coming back." },
  { title: "Inventory", text: "Tobacco, coals, and supply tracking. Automatic stock levels and purchase alerts." },
  { title: "Analytics", text: "Revenue, average check, occupancy by hour. Full business picture." },
  { title: "Telegram", text: "Reservation notifications, reports, and management right in the messenger." },
];

const contentRu = {
  heroSubtitle: "Облачная система управления кальянной. Учёт гостей, бронирования, программа лояльности и аналитика в одном месте.",
  featuresLabel: "Возможности",
  featuresHeadingLine1: "Всё что нужно",
  featuresAccent: "кальянной",
  featuresHeadingSuffix: "",
  ctaTitle: "Узнать стоимость",
  ctaSubtitle: "Свяжитесь с нами для обсуждения условий и подбора оптимального решения.",
  ctaButton: "Связаться",
};

const contentEn = {
  heroSubtitle: "Cloud hookah lounge management system. Guest tracking, reservations, loyalty program, and analytics in one place.",
  featuresLabel: "Features",
  featuresHeadingLine1: "Everything a",
  featuresAccent: "hookah lounge",
  featuresHeadingSuffix: " needs",
  ctaTitle: "Get pricing",
  ctaSubtitle: "Contact us to discuss terms and find the optimal solution.",
  ctaButton: "Contact",
};

export default async function HookahPage() {
  const locale = await getLocale();
  const features = locale === "ru" ? featuresRu : featuresEn;
  const c = locale === "ru" ? contentRu : contentEn;

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
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Features */}
      <AnimatedSection
        className="px-[60px] py-[80px] max-md:px-5 max-md:py-[60px]"
        style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
      >
        <div className="section-label">{c.featuresLabel}</div>
        <h3
          className="font-heading font-bold uppercase tracking-[1px] mb-2"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          {c.featuresHeadingLine1}
          <br />
          <span className="text-gold">{c.featuresAccent}</span>
          {c.featuresHeadingSuffix}
        </h3>
        <div className="grid grid-cols-3 gap-[2px] mt-12 max-md:grid-cols-1">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-surface p-[36px_28px] border border-gold-border-06 transition-all duration-300 hover:border-gold-border hover:bg-surface2"
            >
              <div className="mb-5">{featureIcons[i]}</div>
              <div className="font-heading font-semibold text-[15px] uppercase tracking-[1px] mb-2.5">
                {f.title}
              </div>
              <p className="text-muted text-[13px] leading-[1.7]">{f.text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="px-[60px] py-[100px] text-center max-md:px-5 max-md:py-[60px]">
        <h2
          className="font-heading font-bold uppercase tracking-[1px]"
          style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
        >
          {c.ctaTitle}
        </h2>
        <p className="mt-4 text-muted text-[17px] max-w-[500px] mx-auto">
          {c.ctaSubtitle}
        </p>
        <div className="mt-8 flex justify-center gap-4 max-md:flex-col max-md:items-center">
          <Link
            href="/contact"
            className="bg-gold text-bg px-8 py-[14px] font-heading font-bold text-[13px] tracking-[2px] uppercase no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            {c.ctaButton}
          </Link>
          <a
            href="https://t.me/Raducanpro"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold-border text-text px-8 py-[14px] font-heading font-semibold text-[13px] tracking-[2px] uppercase no-underline transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Telegram
          </a>
        </div>
      </AnimatedSection>
    </>
  );
}
