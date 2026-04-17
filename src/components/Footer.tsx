"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer
      className="px-[60px] pt-[60px] pb-10 relative max-md:px-5 max-md:pt-10 max-md:pb-[30px]"
      style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
    >
      {/* Top */}
      <div className="flex justify-between items-start mb-12 max-md:flex-col max-md:gap-10">
        <div>
          <div className="font-heading font-[900] text-[28px] tracking-[5px] text-gold mb-3">
            RADUCAN
          </div>
          <p className="text-muted text-[13px] max-w-[240px] leading-[1.6]">
            {t("slogan")}.{" "}
            {locale === "ru"
              ? "Разработчик и предприниматель."
              : "Developer and entrepreneur."}
          </p>
        </div>

        <div className="flex gap-[60px] max-md:flex-wrap max-md:gap-10">
          {/* Products */}
          <div>
            <h3 className="text-[11px] tracking-[2px] uppercase text-gold mb-5">
              {t("products")}
            </h3>
            <ul className="list-none flex flex-col gap-2.5">
              <li>
                <Link
                  href="/projects/hookah"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  Raducan Hookah
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/capital"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  Raducan Capital
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/tech"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  Raducan Tech
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-[11px] tracking-[2px] uppercase text-gold mb-5">
              {locale === "ru" ? "Страницы" : "Pages"}
            </h3>
            <ul className="list-none flex flex-col gap-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  {locale === "ru" ? "Обо мне" : "About"}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  {locale === "ru" ? "Блог" : "Blog"}
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  {locale === "ru" ? "Инструменты" : "Tools"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  {locale === "ru" ? "Контакт" : "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] tracking-[2px] uppercase text-gold mb-5">
              {t("contacts")}
            </h3>
            <ul className="list-none flex flex-col gap-2.5">
              <li>
                <a
                  href="https://t.me/Raducanpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="mailto:vadim@radukan.ru"
                  className="text-muted no-underline text-[13px] transition-colors duration-300 hover:text-text"
                >
                  Email
                </a>
              </li>
              <li>
                <span className="text-muted text-[13px]">raducan.pro</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="flex justify-between items-center pt-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span className="text-[12px] text-muted tracking-[0.5px]">
          © {new Date().getFullYear()} Raducan. {t("rights")}.
        </span>
        <div className="flex gap-4">
          <a
            href="https://t.me/Raducanpro"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 border border-gold-border flex items-center justify-center text-muted no-underline text-[13px] transition-all duration-300 hover:border-gold hover:text-gold"
          >
            T
          </a>
          <a
            href="https://github.com/justvadim777"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 border border-gold-border flex items-center justify-center text-muted no-underline text-[13px] transition-all duration-300 hover:border-gold hover:text-gold"
          >
            G
          </a>
        </div>
      </div>
    </footer>
  );
}
