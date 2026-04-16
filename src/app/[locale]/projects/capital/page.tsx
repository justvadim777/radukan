import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Raducan Capital — инвестиционный дашборд",
  description:
    "Тинькофф, БКС, Bybit — единый дашборд для акций, облигаций и криптовалюты.",
  alternates: { canonical: "https://raducan.pro/projects/capital" },
};

const featuresRu = [
  { icon: "📊", title: "Мультипортфельный дашборд", text: "Одновременное отслеживание нескольких портфелей у разных брокеров." },
  { icon: "💹", title: "Акции + облигации + крипто", text: "Все активы в единой таблице. Сравнение доходности и диверсификации." },
  { icon: "📜", title: "История транзакций", text: "Полный журнал покупок, продаж и дивидендов с фильтрацией." },
  { icon: "🎯", title: "Целевой трекер", text: "Поставьте финансовую цель и отслеживайте прогресс каждый день." },
  { icon: "📈", title: "Аналитика", text: "Графики доходности, структура портфеля, сравнение с индексом." },
];

const featuresEn = [
  { icon: "📊", title: "Multi-portfolio dashboard", text: "Simultaneously track multiple portfolios across different brokers." },
  { icon: "💹", title: "Stocks + bonds + crypto", text: "All assets in one table. Compare returns and diversification." },
  { icon: "📜", title: "Transaction history", text: "Complete log of purchases, sales, and dividends with filtering." },
  { icon: "🎯", title: "Goal tracker", text: "Set a financial goal and track progress every day." },
  { icon: "📈", title: "Analytics", text: "Return charts, portfolio structure, benchmark comparison." },
];

const contentRu = {
  heroSubtitle: "Тинькофф, БКС, Bybit — единый дашборд для акций, облигаций и криптовалюты.",
  featuresLabel: "Функционал",
  ctaTitle: "Узнать стоимость",
  ctaSubtitle: "Свяжитесь с нами для обсуждения условий и получения доступа.",
  ctaButton: "Связаться",
};

const contentEn = {
  heroSubtitle: "Tinkoff, BCS, Bybit — a unified dashboard for stocks, bonds, and crypto.",
  featuresLabel: "Features",
  ctaTitle: "Get pricing",
  ctaSubtitle: "Contact us to discuss terms and get access.",
  ctaButton: "Contact",
};

export default async function CapitalPage() {
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
            Raducan · SaaS
          </div>
          <h1
            className="font-heading font-[900] uppercase leading-[1.0] tracking-[-0.5px] mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            <span className="text-gold">Capital</span>
            <br />
            Dashboard
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
        <div className="grid grid-cols-3 gap-[2px] mt-12 max-md:grid-cols-1">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-surface p-[36px_28px] border border-gold-border-06 transition-all duration-300 hover:border-gold-border hover:bg-surface2"
            >
              <div className="text-3xl mb-5">{f.icon}</div>
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
            href="https://t.me/MyPROf_IT"
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
