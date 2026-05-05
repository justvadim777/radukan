"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

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

  // Body scroll lock while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Close when crossing md breakpoint (768px)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

      {/* Mobile burger — stays above overlay (z-201) so its X-animation acts as the close button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none relative z-[201]"
        aria-label={isOpen ? "Закрыть меню" : "Меню"}
        aria-expanded={isOpen}
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

      {/* Mobile full-screen overlay */}
      {isOpen && (
        <div
          className="mobile-menu-overlay md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{ background: "rgba(3, 8, 17, 0.98)" }}
        >
          <div className="mobile-menu-header">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
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
            {/* No close button here — burger in header doubles as close (animated → X) */}
          </div>

          <nav className="mobile-menu-nav" aria-label="Mobile navigation links">
            {navLinks.map((link, i) => (
              <Link
                key={`${link.href}-m-${i}`}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <button
              onClick={() => {
                switchLocale();
                setIsOpen(false);
              }}
              className="mobile-menu-lang"
            >
              {locale === "ru" ? "RU / EN" : "EN / RU"}
            </button>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary w-full"
            >
              {t("ctaButton")} <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
