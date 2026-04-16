import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Raducan Tech — разработка сайтов, ботов и SaaS",
  description:
    "Сайты, Telegram-боты, SaaS-продукты и автоматизация бизнес-процессов под ключ.",
  alternates: { canonical: "https://raducan.pro/projects/tech" },
};

const services = [
  {
    icon: "🌐",
    title: "Сайт / Лендинг",
    price: "от 80 000 ₽",
    text: "Презентационный сайт, лендинг, корпоративный портал. Быстро, красиво, с SEO.",
  },
  {
    icon: "🤖",
    title: "Telegram-бот",
    price: "от 50 000 ₽",
    text: "Автоматизация заказов, поддержки, уведомлений. Интеграция с CRM и базами данных.",
  },
  {
    icon: "🚀",
    title: "SaaS MVP",
    price: "от 150 000 ₽",
    text: "Полноценный веб-продукт с авторизацией, базой данных и платёжной системой.",
  },
  {
    icon: "⚙️",
    title: "Автоматизация",
    price: "от 60 000 ₽",
    text: "Бизнес-процессы, отчёты, интеграции между сервисами.",
  },
];

const process = [
  {
    num: "01",
    title: "Обсуждение задачи",
    text: "Пишите в Telegram. Обсуждаем задачу, формируем ТЗ.",
  },
  {
    num: "02",
    title: "Оценка и сроки",
    text: "Честная оценка стоимости и сроков. Без скрытых платежей.",
  },
  {
    num: "03",
    title: "Разработка",
    text: "Сдаю поэтапно с промежуточными результатами.",
  },
  {
    num: "04",
    title: "Запуск",
    text: "Деплой, тестирование, передача доступов. Поддержка после запуска.",
  },
];

export default function TechPage() {
  return (
    <>
      {/* Hero */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
        <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-gold">
          Разработка · Фриланс
        </span>
        <h1 className="font-heading text-4xl font-bold md:text-6xl">
          Разработка под ключ
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
          Сайты, Telegram-боты, SaaS-продукты и автоматизация бизнес-процессов.
        </p>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading title="Типы работ" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((s, i) => (
            <div
              key={i}
              className="border border-gold-border bg-surface p-6 transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{s.icon}</div>
                <span className="font-heading text-lg font-bold text-gold">
                  {s.price}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Process */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading title="Процесс" />
        <div className="space-y-8">
          {process.map((step) => (
            <div key={step.num} className="flex gap-6">
              <span className="font-heading text-3xl font-bold text-gold">
                {step.num}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="font-heading text-3xl font-bold">Обсудить задачу</h2>
        <p className="mt-3 text-muted">
          Напишите в Telegram — обсудим задачу и предложу решение.
        </p>
        <div className="mt-8">
          <Button href="https://t.me/MyPROf_IT" external>
            Написать в Telegram
          </Button>
        </div>
      </AnimatedSection>
    </>
  );
}
