"use client";

import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useTranslations } from "next-intl";

export function CaseStudySection() {
  const t = useTranslations("caseStudy");

  const metrics = [
    { value: t("metric1Value"), label: t("metric1Label") },
    { value: t("metric2Value"), label: t("metric2Label") },
    { value: t("metric3Value"), label: t("metric3Label") },
  ];

  return (
    <AnimatedSection className="section-line py-16">
      <article className="card grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-[1.3fr_1.5fr_0.8fr] md:p-[34px]">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="text-[25px] leading-[1.22]">{t("heading")}</h2>
          <p className="mt-3 leading-[1.65] text-[#a9bbce]">{t("description")}</p>
          <Link
            href="/projects/hookah"
            className="mt-4 inline-block text-sm font-bold text-[#69aaff] no-underline hover:text-white transition-colors"
          >
            {t("link")} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
          {metrics.map((m, i) => (
            <div key={i} className="border-l border-[var(--line)] pl-6">
              <strong className="block text-[42px] tracking-[-0.05em] text-[#69aaff] leading-none">
                {m.value}
              </strong>
              <small className="mt-2 block leading-[1.45] text-[#aebdd0]">
                {m.label}
              </small>
            </div>
          ))}
        </div>

        <div
          className="flex h-[140px] items-end gap-[9px] rounded-xl border border-[var(--line)] p-[18px]"
          aria-hidden="true"
        >
          {[30, 45, 38, 62, 55, 82].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-lg"
              style={{
                height: `${h}%`,
                background: "linear-gradient(180deg, #5fc7ff, #1e68ff)",
                boxShadow: "0 0 14px rgba(62,153,255,.34)",
              }}
            />
          ))}
        </div>
      </article>
    </AnimatedSection>
  );
}
