"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section
      id="contact"
      className="my-[30px] flex flex-col items-center justify-between gap-6 card p-[30px_38px] md:flex-row"
    >
      <div>
        <h2 className="mb-1.5 text-2xl font-bold">{t("heading")}</h2>
        <p className="text-[#a9bbce] leading-[1.65]">{t("text")}</p>
      </div>
      <Link href="/contact" className="btn btn-primary whitespace-nowrap">
        {t("button")} <span>→</span>
      </Link>
    </section>
  );
}
