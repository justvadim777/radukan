"use client";

import { useTranslations } from "next-intl";

export function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    {
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      value: t("yearsValue"),
      label: t("yearsLabel"),
    },
    {
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      value: t("projectsValue"),
      label: t("projectsLabel"),
    },
    {
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
      value: t("focusValue"),
      label: t("focusLabel"),
    },
  ];

  return (
    <section
      className="section-line grid grid-cols-1 gap-6 py-[34px] md:grid-cols-3"
      aria-label="Statistics"
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="grid grid-cols-[38px_auto] items-center gap-x-3"
        >
          <span className="row-span-2 grid h-[30px] w-[30px] place-items-center rounded-lg border border-[var(--line-strong)] text-[#6fb7ff]">
            {s.icon}
          </span>
          <strong className="text-[23px] leading-none">{s.value}</strong>
          <small className="text-[var(--muted)]">{s.label}</small>
        </div>
      ))}
    </section>
  );
}
