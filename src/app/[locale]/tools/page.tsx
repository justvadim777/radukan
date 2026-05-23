"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const contentRu = {
  heading: "Инструменты",
  subtitle: "Бесплатные инструменты ��ля бизнеса и инвестиций.",
  roi: {
    title: "Калькулятор ROI кальянной",
    description: "Рассчитайте возв��ат инвестиций вашего заведения.",
    revenueLabel: "Выручка в месяц (₽)",
    costsLabel: "Ра��ходы в ме��яц (₽)",
    investmentLabel: "Первоначальные инвестиции (₽)",
    profitLabel: "Прибыль:",
    profitUnit: "₽/мес",
    roiLabel: "ROI:",
  },
  dca: {
    title: "Калькулятор DCA-инвестиций",
    description: "Рассчитайте доход от регулярных инвестиций.",
    monthlyLabel: "Сумма в месяц (₽)",
    monthsLabel: "Срок (месяцев)",
    rateLabel: "Ожидаемая доходность (%/год)",
    investedLabel: "Вложено:",
    totalLabel: "Итого:",
    profitLabel: "Доход:",
  },
  crm: {
    title: "Чек-лист выбора CRM",
    description: "Отметьте функции, которые вам нужны.",
    selectedLabel: "Выбрано:",
    coverageMessage: "Готов помочь с подбором и внедрением CRM под ваши задачи",
    contactLabel: "Обсудить задачу",
    items: [
      "Ведение базы клиентов",
      "Сегментация аудитории",
      "Программа лояльности",
      "Онлайн-бронирование",
      "Управление складом",
      "Аналитика и отчёты",
      "Мобильное приложение или Telegram-бот",
      "Интеграция с кассой",
      "Уведомления и рассылки",
      "Экспорт данных",
    ],
  },
};

const contentEn = {
  heading: "Tools",
  subtitle: "Free tools for business and investments.",
  roi: {
    title: "Hookah lounge ROI calculator",
    description: "Calculate the return on investment for your venue.",
    revenueLabel: "Monthly revenue (₽)",
    costsLabel: "Monthly costs (₽)",
    investmentLabel: "Initial investment (₽)",
    profitLabel: "Profit:",
    profitUnit: "₽/mo",
    roiLabel: "ROI:",
  },
  dca: {
    title: "DCA investment calculator",
    description: "Calculate returns from regular investments.",
    monthlyLabel: "Monthly amount (₽)",
    monthsLabel: "Period (months)",
    rateLabel: "Expected return (%/year)",
    investedLabel: "Invested:",
    totalLabel: "Total:",
    profitLabel: "Profit:",
  },
  crm: {
    title: "CRM selection checklist",
    description: "Check the features you need.",
    selectedLabel: "Selected:",
    coverageMessage: "I can help you choose and implement a CRM tailored to your needs",
    contactLabel: "Discuss a project",
    items: [
      "Client database management",
      "Audience segmentation",
      "Loyalty program",
      "Online reservations",
      "Inventory management",
      "Analytics and reports",
      "Mobile app or Telegram bot",
      "POS integration",
      "Notifications and mailings",
      "Data export",
    ],
  },
};

function ROICalculator({ t }: { t: typeof contentRu.roi }) {
  const locale = useLocale();
  const [revenue, setRevenue] = useState(500000);
  const [costs, setCosts] = useState(350000);
  const [investment, setInvestment] = useState(100000);

  const profit = revenue - costs;
  const roi = investment > 0 ? ((profit / investment) * 100).toFixed(1) : "0";

  return (
    <div className="border border-gold-border bg-surface p-6">
      <h3 className="font-heading text-lg font-semibold">{t.title}</h3>
      <p className="mt-1 text-sm text-muted">{t.description}</p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-muted">{t.revenueLabel}</label>
          <input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="mt-1 w-full border border-gold-border bg-bg px-4 py-2 text-text focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-muted">{t.costsLabel}</label>
          <input
            type="number"
            value={costs}
            onChange={(e) => setCosts(Number(e.target.value))}
            className="mt-1 w-full border border-gold-border bg-bg px-4 py-2 text-text focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-muted">{t.investmentLabel}</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="mt-1 w-full border border-gold-border bg-bg px-4 py-2 text-text focus:border-gold focus:outline-none"
          />
        </div>
        <div className="border-t border-gold-border pt-4">
          <p className="text-sm text-muted">
            {t.profitLabel}{" "}
            <span className="font-semibold text-text">
              {profit.toLocaleString(locale === "ru" ? "ru-RU" : "en-US")} {t.profitUnit}
            </span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {t.roiLabel}{" "}
            <span className="font-heading text-2xl font-bold text-gold">
              {roi}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function DCACalculator({ t }: { t: typeof contentRu.dca }) {
  const locale = useLocale();
  const [monthly, setMonthly] = useState(10000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(10);

  const totalInvested = monthly * months;
  const monthlyRate = rate / 100 / 12;
  const futureValue =
    monthlyRate > 0
      ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : totalInvested;
  const profit = futureValue - totalInvested;
  const loc = locale === "ru" ? "ru-RU" : "en-US";

  return (
    <div className="border border-gold-border bg-surface p-6">
      <h3 className="font-heading text-lg font-semibold">{t.title}</h3>
      <p className="mt-1 text-sm text-muted">{t.description}</p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-muted">{t.monthlyLabel}</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="mt-1 w-full border border-gold-border bg-bg px-4 py-2 text-text focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-muted">{t.monthsLabel}</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-1 w-full border border-gold-border bg-bg px-4 py-2 text-text focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-muted">{t.rateLabel}</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full border border-gold-border bg-bg px-4 py-2 text-text focus:border-gold focus:outline-none"
          />
        </div>
        <div className="border-t border-gold-border pt-4">
          <p className="text-sm text-muted">
            {t.investedLabel}{" "}
            <span className="font-semibold text-text">
              {totalInvested.toLocaleString(loc)} ₽
            </span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {t.totalLabel}{" "}
            <span className="font-semibold text-text">
              {Math.round(futureValue).toLocaleString(loc)} ₽
            </span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {t.profitLabel}{" "}
            <span className="font-heading text-2xl font-bold text-gold">
              +{Math.round(profit).toLocaleString(loc)} ₽
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function CRMChecklist({ t }: { t: typeof contentRu.crm }) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(t.items.length).fill(false)
  );

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const count = checked.filter(Boolean).length;

  return (
    <div className="border border-gold-border bg-surface p-6">
      <h3 className="font-heading text-lg font-semibold">{t.title}</h3>
      <p className="mt-1 text-sm text-muted">{t.description}</p>
      <div className="mt-6 space-y-3">
        {t.items.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-3 cursor-pointer text-sm text-muted hover:text-text transition-colors"
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="h-4 w-4 accent-[#D4AF37]"
            />
            {item}
          </label>
        ))}
      </div>
      <div className="mt-4 border-t border-gold-border pt-4">
        <p className="text-sm text-muted">
          {t.selectedLabel}{" "}
          <span className="font-heading text-lg font-bold text-gold">
            {count}/{t.items.length}
          </span>
        </p>
        {count >= 5 && (
          <div className="mt-2">
            <p className="text-sm text-muted">{t.coverageMessage}</p>
            <Link
              href="/contact"
              className="mt-3 inline-block border border-gold px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-bg"
            >
              {t.contactLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const locale = useLocale();
  const c = locale === "ru" ? contentRu : contentEn;

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">
        {c.heading}
      </h1>
      <p className="mt-4 text-lg text-muted">{c.subtitle}</p>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ROICalculator t={c.roi} />
        <DCACalculator t={c.dca} />
        <CRMChecklist t={c.crm} />
      </div>
    </AnimatedSection>
  );
}
