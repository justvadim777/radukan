import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Связаться с Вадимом Радуканом",
  description:
    "Напишите в Telegram или оставьте заявку. Обсудим задачу и предложу решение.",
  alternates: { canonical: "https://raducan.pro/contact" },
};

const tasks = [
  "Разработка сайта или приложения",
  "Telegram-бот",
  "Демо Raducan Hookah",
  "Демо Raducan Capital",
  "Партнёрство",
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">
          Обсудим задачу
        </h1>
        <p className="mt-4 text-lg text-muted">
          Напишите в Telegram — отвечаю в течение нескольких часов. Или оставьте
          заявку.
        </p>
      </AnimatedSection>

      {/* Contacts */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <a
            href="https://t.me/MyPROf_IT"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-gold-border bg-surface p-8 transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
          >
            <div className="text-2xl mb-3">💬</div>
            <h3 className="font-heading text-lg font-semibold">Telegram</h3>
            <p className="mt-1 text-gold group-hover:text-text transition-colors">
              @MyPROf_IT
            </p>
            <p className="mt-2 text-sm text-muted">Основной канал связи</p>
          </a>
          <a
            href="mailto:vadim@radukan.ru"
            className="group border border-gold-border bg-surface p-8 transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
          >
            <div className="text-2xl mb-3">📧</div>
            <h3 className="font-heading text-lg font-semibold">Email</h3>
            <p className="mt-1 text-gold group-hover:text-text transition-colors">
              vadim@radukan.ru
            </p>
            <p className="mt-2 text-sm text-muted">Для документов и деталей</p>
          </a>
        </div>
      </AnimatedSection>

      {/* For which task */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-12">
        <SectionHeading title="Для какой задачи?" />
        <div className="flex flex-wrap gap-3">
          {tasks.map((task) => (
            <span
              key={task}
              className="border border-gold-border bg-gold-dim px-5 py-3 text-sm text-gold"
            >
              {task}
            </span>
          ))}
        </div>
      </AnimatedSection>

      {/* Contact form */}
      <AnimatedSection className="mx-auto max-w-4xl px-6 py-12 pb-24">
        <SectionHeading title="Оставить заявку" />
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full border border-gold-border bg-surface px-4 py-3 text-text placeholder:text-muted focus:border-gold focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gold-border bg-surface px-4 py-3 text-text placeholder:text-muted focus:border-gold focus:outline-none"
            />
          </div>
          <textarea
            rows={5}
            placeholder="Опишите вашу задачу..."
            className="w-full border border-gold-border bg-surface px-4 py-3 text-text placeholder:text-muted focus:border-gold focus:outline-none resize-none"
          />
          <Button>Отправить</Button>
        </form>
      </AnimatedSection>
    </>
  );
}
