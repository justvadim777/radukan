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
    { href: "/" as const, label: t("home") },
    { href: "/projects" as const, label: t("projects") },
    { href: "/projects/hookah" as const, label: "Hookah" },
    { href: "/blog" as const, label: t("blog") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ];

  const switchLocale = () => {
    const next = locale === "ru" ? "en" : "ru";
    router.replace(pathname, { locale: next });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[60px] py-5 bg-bg/85 backdrop-blur-[20px]"
      style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
    >
      <Link
        href="/"
        className="font-heading font-[900] text-[22px] tracking-[4px] text-gold no-underline"
      >
        RADUCAN
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted no-underline text-[13px] tracking-[1.5px] uppercase transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-5">
        <button
          onClick={switchLocale}
          className="text-[12px] tracking-[1px] text-muted cursor-pointer border border-gold-border px-[10px] py-1 transition-all duration-300 hover:text-gold hover:border-gold bg-transparent"
        >
          {locale === "ru" ? "RU / EN" : "EN / RU"}
        </button>
        <Link
          href="/contact"
          className="bg-gold text-bg px-5 py-[10px] font-heading font-bold text-[11px] tracking-[2px] uppercase no-underline inline-block transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        >
          {locale === "ru" ? "Связаться" : "Contact"}
        </Link>
      </div>

      {/* Mobile burger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none"
        aria-label="Меню"
      >
        <span
          className={`block h-0.5 w-6 bg-text transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-text transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-text transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
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
            className="absolute top-full left-0 right-0 overflow-hidden md:hidden"
            style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}
          >
            <ul className="flex flex-col gap-4 px-5 py-6 bg-bg list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base text-muted no-underline transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-3 pt-2">
                <button
                  onClick={switchLocale}
                  className="text-[12px] tracking-[1px] text-muted border border-gold-border px-[10px] py-1 bg-transparent hover:text-gold hover:border-gold transition-all duration-300"
                >
                  {locale === "ru" ? "RU / EN" : "EN / RU"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
