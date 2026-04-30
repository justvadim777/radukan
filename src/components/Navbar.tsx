"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/projects" as const, label: t("products") },
    { href: "/projects/tech" as const, label: t("services") },
    { href: "/about" as const, label: t("about") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/contact" as const, label: t("contact") },
  ];

  const switchLocale = () => {
    const next = locale === "ru" ? "en" : "ru";
    router.replace(pathname, { locale: next });
  };

  return (
    <header className="relative z-10 mx-auto flex h-[92px] w-[min(1280px,calc(100%-56px))] items-center justify-between border-b border-[var(--line)]">
      {/* Brand */}
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
          R
        </span>
        <span>RADUCAN.PRO</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-11" aria-label="Main navigation">
        {navLinks.map((link, i) => (
          <Link
            key={`${link.href}-${i}`}
            href={link.href}
            className="text-[#c9d7e7] no-underline text-sm transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={switchLocale}
          className="text-xs tracking-wider text-[#c9d7e7] cursor-pointer border border-[var(--line-strong)] px-2.5 py-1 rounded transition-all hover:text-white hover:border-[var(--blue)] bg-transparent"
        >
          {locale === "ru" ? "RU / EN" : "EN / RU"}
        </button>
        <Link href="/contact" className="btn btn-outline text-xs">
          {t("ctaButton")} <span>→</span>
        </Link>
      </div>

      {/* Mobile burger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none"
        aria-label="Menu"
      >
        <span
          className={`block h-0.5 w-6 bg-[var(--text)] transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-[var(--text)] transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-[var(--text)] transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 overflow-hidden md:hidden border-t border-[var(--line)] bg-[var(--bg)]"
          >
            <ul className="flex flex-col gap-4 px-5 py-6 list-none">
              {navLinks.map((link, i) => (
                <li key={`${link.href}-m-${i}`}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base text-[#c9d7e7] no-underline transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-3 pt-2">
                <button
                  onClick={switchLocale}
                  className="text-xs tracking-wider text-[#c9d7e7] border border-[var(--line-strong)] px-2.5 py-1 rounded bg-transparent hover:text-white hover:border-[var(--blue)] transition-all"
                >
                  {locale === "ru" ? "RU / EN" : "EN / RU"}
                </button>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full text-xs"
                >
                  {t("ctaButton")}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
