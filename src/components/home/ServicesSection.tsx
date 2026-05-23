"use client";

import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useTranslations } from "next-intl";

const crmIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const saasIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const automationIcon = (
  <svg
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
);

export function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    {
      href: "/contact" as const,
      title: t("crmTitle"),
      description: t("crmDescription"),
      icon: crmIcon,
    },
    {
      href: "/contact" as const,
      title: t("saasTitle"),
      description: t("saasDescription"),
      icon: saasIcon,
    },
    {
      href: "/contact" as const,
      title: t("automationTitle"),
      description: t("automationDescription"),
      icon: automationIcon,
    },
  ];

  return (
    <AnimatedSection className="section-line py-16">
      <div className="mb-8 grid items-end gap-11 md:grid-cols-[0.8fr_1.2fr]">
        <p className="eyebrow !mb-0">{t("eyebrow")}</p>
        <h2 className="max-w-[520px] text-[34px] leading-[1.18] tracking-[-0.04em]">
          {t("heading")}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <article
            key={i}
            className="card min-h-[196px] p-[30px] transition-all hover:-translate-y-1"
          >
            <span className="grid h-[46px] w-[46px] place-items-center rounded-[11px] border border-[var(--line-strong)] text-[#7cc2ff] bg-[rgba(24,86,180,0.18)]">
              {s.icon}
            </span>
            <h3 className="mt-[18px] mb-2.5 text-[19px] font-bold">{s.title}</h3>
            <p className="leading-[1.65] text-[#a9bbce]">{s.description}</p>
            <Link
              href={s.href}
              className="mt-4 inline-block text-sm font-bold text-[#69aaff] no-underline hover:text-white transition-colors"
            >
              {t("learnMore")} →
            </Link>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
