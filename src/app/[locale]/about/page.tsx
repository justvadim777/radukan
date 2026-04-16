import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "О Вадиме Радукане — разработчик и предприниматель",
  description:
    "Вадим Радукан — разработчик и предприниматель. Строю IT-продукты для малого бизнеса. Молдова → Москва → Рига.",
  alternates: { canonical: "https://raducan.pro/about" },
};

const experience = [
  {
    period: "2024 — настоящее время",
    company: "Raducan",
    role: "Основатель",
    description:
      "Разрабатываю и управляю экосистемой IT-продуктов: CRM для кальянных, инвестиционный дашборд, фриланс-разработка.",
  },
  {
    period: "2025 — настоящее время",
    company: "Остров Lounge",
    role: "Управляющий",
    description:
      "Операционное управление кальянным баром в Риге: персонал, финансы, закупки, сервис.",
  },
  {
    period: "2022–2023",
    company: "RoboWeb",
    role: "Руководитель разработки",
    description:
      "Руководил командой разработки. Вёл Яндекс Директ с бюджетом 150 000 ₽/мес. Управлял проектом интернет-гипермаркета стройматериалов.",
  },
  {
    period: "2022 — настоящее время",
    company: "Фриланс",
    role: "Разработчик",
    description:
      "Разработка сайтов, Telegram-ботов и SaaS-продуктов для малого бизнеса.",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "Python",
  "Docker",
  "Nginx",
  "PostgreSQL",
  "Prisma",
];

const values = [
  {
    title: "Строю системы",
    text: "Смотрю на бизнес целиком, а не решаю отдельные задачи.",
  },
  {
    title: "Результат",
    text: "Сдаю работающие продукты, которые приносят деньги.",
  },
  {
    title: "Малый бизнес",
    text: "Моя аудитория. Понимаю задачи и ограничения.",
  },
  {
    title: "Прямота",
    text: "Честные сроки, прозрачное ценообразование, прямая связь.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
        <h1 className="font-heading text-4xl font-bold md:text-6xl">
          Вадим Радукан
        </h1>
        <p className="mt-4 text-lg text-muted md:text-xl">
          Разработчик и предприниматель. Строю IT-продукты для малого бизнеса.
        </p>
      </AnimatedSection>

      {/* Bio */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading title="Биография" />
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            Родился в Яловень, Молдова. Учился в РГАУ-МСХА в Москве на инженера
            по техносферной безопасности — но карьера быстро ушла в IT и бизнес.
          </p>
          <p>
            Сейчас живу и работаю в Риге. Управляю кальянным баром Остров Lounge
            и строю экосистему продуктов под брендом Raducan.
          </p>
        </div>
      </AnimatedSection>

      {/* Experience */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading title="Опыт" />
        <div className="space-y-8">
          {experience.map((item, i) => (
            <div
              key={i}
              className="border-l-2 border-gold-border pl-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-xs text-gold font-medium">
                  {item.period}
                </span>
                <h3 className="font-heading text-lg font-semibold">
                  {item.company}
                </h3>
                <span className="text-sm text-muted">— {item.role}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Stack */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading title="Стек" />
        <div className="flex flex-wrap gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-none border border-gold-border bg-gold-dim px-4 py-2 text-sm font-medium text-gold"
            >
              {tech}
            </span>
          ))}
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading title="Ценности" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <div key={i} className="border border-gold-border bg-surface p-6">
              <h3 className="font-heading text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="font-heading text-3xl font-bold">Работать вместе</h2>
        <p className="mt-3 text-muted">
          Готов обсудить вашу задачу и предложить решение.
        </p>
        <div className="mt-8">
          <Button href="/contact">Связаться</Button>
        </div>
      </AnimatedSection>
    </>
  );
}
