"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

const approaches = [
  {
    num: "01",
    title: "Быстрый старт",
    text: "От идеи до рабочего MVP за 2–4 недели. Без долгих согласований и лишней бюрократии.",
  },
  {
    num: "02",
    title: "Работающий продукт",
    text: "Сдаю то, что реально работает и приносит результат. Не красивые презентации.",
  },
  {
    num: "03",
    title: "Системный подход",
    text: "Смотрю на бизнес целиком. Строю решение, которое масштабируется вместе с вами.",
  },
  {
    num: "04",
    title: "Прямая связь",
    text: "Работаю напрямую, без посредников. Telegram, быстрые ответы, честные сроки.",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "FastAPI",
  "Python",
  "Docker",
  "PostgreSQL",
];

export function ApproachSection() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        title="Строю системы, не выполняю задачи"
        subtitle="Помогаю малому бизнесу работать как большая система. Результат — не процесс."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {approaches.map((item) => (
          <div key={item.num} className="flex gap-4">
            <span className="font-heading text-2xl font-bold text-gold">
              {item.num}
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-none border border-gold-border bg-gold-dim px-4 py-2 text-xs font-medium text-gold"
          >
            {tech}
          </span>
        ))}
      </div>
    </AnimatedSection>
  );
}
