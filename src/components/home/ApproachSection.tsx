"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { useLocale } from "next-intl";

const approachesRu = [
  {
    num: "01",
    title: "Быстрый старт",
    text: "От идеи до рабочего MVP за 2–4 недели. Без долгих согласований и бюрократии.",
  },
  {
    num: "02",
    title: "Работающий продукт",
    text: "Сдаю то, что реально работает и приносит деньги. Не красивые презентации.",
  },
  {
    num: "03",
    title: "Системный подход",
    text: "Смотрю на бизнес целиком. Строю решение которое масштабируется.",
  },
  {
    num: "04",
    title: "Прямая связь",
    text: "Работаю напрямую, без посредников. Telegram, быстрые ответы.",
  },
];

const approachesEn = [
  {
    num: "01",
    title: "Quick start",
    text: "From idea to working MVP in 2–4 weeks. No lengthy approvals or bureaucracy.",
  },
  {
    num: "02",
    title: "Working product",
    text: "I deliver what actually works and makes money. Not pretty presentations.",
  },
  {
    num: "03",
    title: "Systematic approach",
    text: "I look at the business as a whole. Building solutions that scale.",
  },
  {
    num: "04",
    title: "Direct communication",
    text: "I work directly, no middlemen. Telegram, fast responses.",
  },
];

const contentRu = {
  sectionLabel: "Подход",
  headingLine1: "Строю системы,",
  headingLine2: "не ",
  headingAccent: "выполняю",
  headingLine3: "задачи",
  subtitle: "Помогаю малому бизнесу работать как большая система. Результат — не процесс.",
};

const contentEn = {
  sectionLabel: "Approach",
  headingLine1: "Building systems,",
  headingLine2: "not ",
  headingAccent: "doing",
  headingLine3: "tasks",
  subtitle: "Helping small businesses operate like big systems. Result — not process.",
};

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "FastAPI",
  "Docker",
  "Nginx",
  "PostgreSQL",
  "Tailwind",
];

export function ApproachSection() {
  const locale = useLocale();
  const approaches = locale === "ru" ? approachesRu : approachesEn;
  const c = locale === "ru" ? contentRu : contentEn;

  return (
    <AnimatedSection
      className="px-[60px] py-[100px] max-md:px-5 max-md:py-[60px]"
      style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
    >
      <div className="grid grid-cols-[1fr_1.6fr] gap-20 items-start max-md:grid-cols-1 max-md:gap-10">
        {/* Left */}
        <div>
          <div className="section-label">{c.sectionLabel}</div>
          <h2
            className="font-heading font-bold uppercase tracking-[1px] leading-[1.1] mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            {c.headingLine1}
            <br />
            {c.headingLine2}<span className="text-gold">{c.headingAccent}</span>
            <br />
            {c.headingLine3}
          </h2>
          <p className="text-muted leading-[1.8] mb-9">
            {c.subtitle}
          </p>

          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] tracking-[1px] px-[14px] py-1.5 border border-gold-border text-muted uppercase transition-all duration-300 hover:border-gold hover:text-gold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col">
          {approaches.map((item) => (
            <div
              key={item.num}
              className="grid grid-cols-[48px_1fr] gap-6 items-start py-7 transition-all duration-300 hover:pl-2"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
            >
              <span className="font-heading font-[900] text-[13px] text-gold tracking-[1px] pt-[3px]">
                {item.num}
              </span>
              <div>
                <div className="font-heading font-semibold text-[16px] uppercase tracking-[1px] mb-1.5">
                  {item.title}
                </div>
                <p className="text-muted text-[14px] leading-[1.7]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
