import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Продукты Raducan — CRM, инвестиции, разработка",
  description:
    "Экосистема продуктов Raducan: CRM для кальянных, инвестиционный дашборд, разработка под ключ.",
  alternates: { canonical: "https://raducan.pro/projects" },
};

const projects = [
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
    cta: "Подробнее",
  },
];

export default function ProjectsPage() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">Проекты</h1>
      <p className="mt-4 text-lg text-muted">
        Экосистема продуктов для бизнеса, инвестиций и автоматизации.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((project, i) => (
          <Card key={i} {...project} />
        ))}
      </div>
    </AnimatedSection>
  );
}
