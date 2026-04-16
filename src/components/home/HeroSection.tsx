"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const contentRu = {
  tag: "Вадим Радукан — Разработчик",
  titleLine1: "Строю ",
  titleAccent: "системы",
  titleLine2: "для бизнеса",
  subtitle:
    "Создаю продукты для HoReCa, инвестиций и автоматизации. От идеи до рабочего продукта — за 2–4 недели.",
  cta1: "Мои проекты",
  cta2: "Обсудить задачу",
};

const contentEn = {
  tag: "Vadim Radukan — Developer",
  titleLine1: "Building ",
  titleAccent: "systems",
  titleLine2: "for business",
  subtitle:
    "Creating products for HoReCa, investments, and automation. From idea to working product in 2–4 weeks.",
  cta1: "My projects",
  cta2: "Discuss a task",
};

export function HeroSection() {
  const locale = useLocale();
  const c = locale === "ru" ? contentRu : contentEn;

  return (
    <section className="relative min-h-screen flex items-center px-[60px] pt-[120px] pb-[80px] overflow-hidden max-md:px-5 max-md:pt-[100px] max-md:pb-[60px]">
      {/* Background glow */}
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)]" />

      <div className="max-w-[720px]">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 text-[12px] tracking-[2px] uppercase text-gold mb-8"
        >
          <span className="w-6 h-px bg-gold" />
          {c.tag}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-heading font-[900] uppercase leading-[1.0] tracking-[-1px] mb-7"
          style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
        >
          {c.titleLine1}<span className="text-gold">{c.titleAccent}</span>
          <br />
          {c.titleLine2}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-[17px] text-muted leading-[1.7] max-w-[520px] mb-12"
        >
          {c.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex gap-4 max-md:flex-col"
        >
          <Link
            href="/projects"
            className="relative overflow-hidden bg-gold text-bg px-8 py-[14px] font-heading font-bold text-[13px] tracking-[2px] uppercase no-underline inline-block transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            {c.cta1}
          </Link>
          <Link
            href="/contact"
            className="border border-gold-border text-text px-8 py-[14px] font-heading font-semibold text-[13px] tracking-[2px] uppercase no-underline inline-block transition-all duration-300 hover:border-gold hover:text-gold"
          >
            {c.cta2}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-[60px] flex items-center gap-3 text-[11px] tracking-[2px] uppercase text-muted max-md:hidden"
      >
        <div className="w-10 h-px bg-gold-border relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gold"
            style={{ animation: "scrollLine 2s 1.5s ease-in-out infinite" }}
          />
        </div>
        Scroll
      </motion.div>
    </section>
  );
}
