"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Blueprint } from "@/components/Blueprint";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="section-line relative grid min-h-[610px] grid-cols-1 items-center gap-9 py-16 md:grid-cols-[0.92fr_1.08fr]">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 leading-[0.94] tracking-[-0.065em]"
          style={{ fontSize: "clamp(48px, 5.4vw, 84px)" }}
        >
          {t("h1Line1")}
          <br />
          <span
            className="text-[#66a8ff]"
            style={{ textShadow: "0 0 28px rgba(57,137,255,.42)" }}
          >
            {t("h1Line2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-4 text-base font-semibold text-[#66a8ff] tracking-wide"
        >
          {t("subhead")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="max-w-[460px] text-[17px] leading-[1.75] text-[#c3d2e2]"
        >
          {t("text")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-9 flex flex-wrap gap-[18px]"
        >
          <Link href="/projects" className="btn btn-primary">
            {t("ctaPrimary")} <span>→</span>
          </Link>
          <Link href="/contact" className="btn btn-outline">
            {t("ctaOutline")}
          </Link>
        </motion.div>
      </div>

      <Blueprint />
    </section>
  );
}
