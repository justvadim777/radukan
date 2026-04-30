"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { useTranslations } from "next-intl";

const stepIcons = [
  // Discovery — magnifier
  (
    <svg
      key="d"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  // Strategy — folder/map
  (
    <svg
      key="s"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h7l3 4h8v12H3z" />
    </svg>
  ),
  // Development — code
  (
    <svg
      key="dv"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  // Testing — check
  (
    <svg
      key="t"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  // Launch — rocket-circle
  (
    <svg
      key="l"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l5 5L20 7" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
];

const stepKeys = [
  { num: "01", title: "DISCOVERY", textKey: "discoveryText" },
  { num: "02", title: "STRATEGY", textKey: "strategyText" },
  { num: "03", title: "DEVELOPMENT", textKey: "developmentText" },
  { num: "04", title: "TESTING", textKey: "testingText" },
  { num: "05", title: "LAUNCH", textKey: "launchText" },
] as const;

export function ApproachSection() {
  const t = useTranslations("approach");

  return (
    <AnimatedSection className="section-line py-16">
      <div className="mb-2">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="text-[34px] leading-[1.18] tracking-[-0.04em] max-w-[640px]">
          {t("heading")}
        </h2>
      </div>

      <div className="relative mt-[42px] grid grid-cols-2 gap-7 md:grid-cols-5">
        <div
          className="absolute hidden md:block"
          style={{
            left: "8%",
            right: "8%",
            top: "25px",
            borderTop: "1px dashed rgba(112,180,255,.35)",
          }}
        />
        {stepKeys.map((step, i) => (
          <article key={step.num} className="relative z-[1]">
            <span className="text-[13px] font-extrabold text-[#68aaff]">
              {step.num}
            </span>
            <div className="mt-3 mb-[22px] grid h-[46px] w-[46px] place-items-center rounded-[11px] border border-[var(--line-strong)] text-[#7cc2ff] bg-[#061426]">
              {stepIcons[i]}
            </div>
            <h3 className="text-sm uppercase tracking-[0.04em] text-[#9bcaff] font-semibold">
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-[1.58] text-[#9badc2]">
              {t(step.textKey)}
            </p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
