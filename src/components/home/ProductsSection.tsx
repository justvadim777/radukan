"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";

const products = [
  {
    href: "/projects/hookah",
    tag: "CRM · HoReCa",
    title: "Raducan Hookah",
    description:
      "Облачная CRM для автоматизации кальянных. Учёт гостей, бронирования, программа лояльности и аналитика в одном месте.",
    cta: "Подробнее",
  },
  {
    href: "/projects/capital",
    tag: "SaaS · Инвестиции",
    title: "Raducan Capital",
    description:
      "Инвестиционный дашборд. Тинькофф, БКС, Bybit в едином портфеле с аналитикой и целевым трекером.",
    cta: "Подробнее",
  },
  {
    href: "/projects/tech",
    tag: "Разработка · Фриланс",
    title: "Raducan Tech",
    description:
      "Сайты, Telegram-боты, SaaS-продукты и автоматизация бизнес-процессов под ключ.",
    cta: "Обсудить задачу",
  },
];

export function ProductsSection() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading title="Экосистема Raducan" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product, i) => (
          <Card key={i} {...product} />
        ))}
      </div>
    </AnimatedSection>
  );
}
