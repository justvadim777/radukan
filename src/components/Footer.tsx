"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative z-10 mx-auto grid w-[min(1280px,calc(100%-56px))] gap-10 pb-12 pt-12 text-[var(--muted)] md:grid-cols-[1.7fr_repeat(3,1fr)]">
      {/* Brand */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[var(--text)] no-underline font-extrabold tracking-[0.02em]"
        >
          <span
            className="grid h-[34px] w-[34px] place-items-center rounded-[9px] border border-[var(--line-strong)] text-white font-bold"
            style={{
              background:
                "linear-gradient(135deg, rgba(45,125,255,.32), rgba(4,12,24,.9))",
              boxShadow:
                "0 0 22px rgba(45,125,255,.18), inset 0 0 18px rgba(86,199,255,.12)",
            }}
          >
            Р
          </span>
          <span>РАДУКАН.ПРО</span>
        </Link>
        <p className="mt-4 max-w-[210px] text-[var(--muted)] leading-[1.6] text-sm">
          {t("tagline")}
        </p>
      </div>

      {/* Services */}
      <div>
        <h4 className="mb-[18px] text-[13px] font-medium uppercase tracking-[0.08em] text-white">
          {t("services")}
        </h4>
        <Link
          href="/contact"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          {t("crmDev")}
        </Link>
        <Link
          href="/contact"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          {t("saasDev")}
        </Link>
        <Link
          href="/contact"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          {t("customDev")}
        </Link>
      </div>

      {/* Company */}
      <div>
        <h4 className="mb-[18px] text-[13px] font-medium uppercase tracking-[0.08em] text-white">
          {t("company")}
        </h4>
        <Link
          href="/about"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          {t("about")}
        </Link>
        <Link
          href="/blog"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          {t("blog")}
        </Link>
      </div>

      {/* Contact */}
      <div>
        <h4 className="mb-[18px] text-[13px] font-medium uppercase tracking-[0.08em] text-white">
          {t("contact")}
        </h4>
        <a
          href="mailto:vadim@radukan.ru"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          vadim@radukan.ru
        </a>
        <a
          href="https://t.me/Raducanpro"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          Telegram
        </a>
        <a
          href="https://github.com/justvadim777"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-[11px] block text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
