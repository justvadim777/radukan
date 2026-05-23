"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Wait for client mount before using createPortal
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/about" as const, label: t("about") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/tools" as const, label: t("tools") },
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

  // Mobile menu overlay — rendered via React Portal directly into document.body
  // to escape any parent stacking context (header has position:relative + z-10).
  // Inline-style is the source of truth; CSS class is supplementary.
  const mobileMenu = (
    <div
      className="mobile-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: "rgba(3, 8, 17, 0.98)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        paddingBottom: "max(24px, env(safe-area-inset-bottom))",
        height: "100dvh",
        width: "100vw",
        overflowY: "auto",
      }}
    >
      <div
        className="mobile-menu-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          /* Match the closed-state header offsets: header is
             min(1280px, 100% - 56px) so its content sits at 28px from
             screen edges. Overlay padding is 16px, so we add 12px
             inside the header row → 16 + 12 = 28px. */
          padding: "0 12px",
        }}
      >
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

        {/* Guaranteed-visible close button inside the overlay — does not
            rely on the burger button being clickable above the portal. */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Закрыть меню"
          style={{
            width: "44px",
            height: "44px",
            display: "grid",
            placeItems: "center",
            background: "transparent",
            border: "1px solid rgba(91, 166, 255, 0.34)",
            borderRadius: "8px",
            color: "#eef6ff",
            fontSize: "20px",
            fontWeight: 400,
            cursor: "pointer",
            lineHeight: 1,
            padding: 0,
          }}
        >
          ✕
        </button>
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
  );

  return (
    <>
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

        {/* Mobile burger — only visible when menu is closed.
            When menu is open, the close button lives inside the overlay
            (single source of truth, no z-index race with the portal). */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none"
            aria-label="Меню"
            aria-expanded={false}
          >
            <span
              className="block h-0.5 w-6 transition-transform duration-300"
              style={{ backgroundColor: "#eef6ff" }}
            />
            <span
              className="block h-0.5 w-6 transition-opacity duration-300"
              style={{ backgroundColor: "#eef6ff" }}
            />
            <span
              className="block h-0.5 w-6 transition-transform duration-300"
              style={{ backgroundColor: "#eef6ff" }}
            />
          </button>
        )}
      </header>

      {/* Portal overlay into body — escapes any parent stacking context */}
      {isOpen && mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
