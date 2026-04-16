"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const productLinks = [
  { href: "/projects/hookah" as const, label: "Raducan Hookah" },
  { href: "/projects/capital" as const, label: "Raducan Capital" },
  { href: "/projects/tech" as const, label: "Raducan Tech" },
];

const resourceLinks = [
  { href: "/blog" as const, label: "Блог" },
  { href: "/glossary" as const, label: "Глоссарий" },
  { href: "/tools" as const, label: "Инструменты" },
  { href: "/reviews" as const, label: "Отзывы" },
];

const contactLinks = [
  { href: "https://t.me/MyPROf_IT", label: "Telegram", external: true },
  { href: "mailto:vadim@radukan.ru", label: "vadim@radukan.ru", external: true },
  { href: "https://github.com/justvadim777", label: "GitHub", external: true },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gold-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-heading text-xl font-bold text-gold"
            >
              RADUCAN
            </Link>
            <p className="mt-3 text-sm text-muted">{t("slogan")}</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text">
              {t("products")}
            </h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text">
              {t("resources")}
            </h3>
            <ul className="mt-3 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-text">
              {t("contacts")}
            </h3>
            <ul className="mt-3 space-y-2">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gold-border pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Вадим Радукан. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}
