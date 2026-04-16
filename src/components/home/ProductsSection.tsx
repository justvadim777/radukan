"use client";

import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLocale } from "next-intl";

const productsRu = [
  {
    href: "/projects/hookah" as const,
    tag: "CRM · HoReCa",
    name: "Hookah",
    description:
      "Облачная CRM для автоматизации кальянных. Гости, бронирования, лояльность, аналитика.",
    cta: "Подробнее",
  },
  {
    href: "/projects/capital" as const,
    tag: "SaaS · Инвестиции",
    name: "Capital",
    description:
      "Инвестиционный дашборд. Тинькофф, БКС, Bybit в едином портфеле.",
    cta: "Подробнее",
  },
  {
    href: "/projects/tech" as const,
    tag: "Разработка · Фриланс",
    name: "Tech",
    description:
      "Сайты, Telegram-боты, SaaS-продукты и автоматизация под ключ.",
    cta: "Обсудить",
  },
];

const productsEn = [
  {
    href: "/projects/hookah" as const,
    tag: "CRM · HoReCa",
    name: "Hookah",
    description:
      "Cloud CRM for hookah lounge automation. Guests, reservations, loyalty, analytics.",
    cta: "Learn more",
  },
  {
    href: "/projects/capital" as const,
    tag: "SaaS · Investments",
    name: "Capital",
    description:
      "Investment dashboard. Tinkoff, BCS, Bybit in a single portfolio.",
    cta: "Learn more",
  },
  {
    href: "/projects/tech" as const,
    tag: "Development · Freelance",
    name: "Tech",
    description:
      "Websites, Telegram bots, SaaS products, and turnkey automation.",
    cta: "Discuss",
  },
];

const contentRu = {
  sectionLabel: "Продукты",
  heading: "Экосистема ",
  headingAccent: "Raducan",
  headingSuffix: "",
};

const contentEn = {
  sectionLabel: "Products",
  heading: "The ",
  headingAccent: "Raducan",
  headingSuffix: " Ecosystem",
};

const icons = [
  (
    <svg key="hookah" className="w-10 h-10 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C8 2 5 5 5 8c0 4 3 6 3 10h8c0-4 3-6 3-10 0-3-3-6-7-6z" />
      <path d="M9 18h6M10 21h4" />
    </svg>
  ),
  (
    <svg key="capital" className="w-10 h-10 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  (
    <svg key="tech" className="w-10 h-10 text-gold opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
];

export function ProductsSection() {
  const locale = useLocale();
  const products = locale === "ru" ? productsRu : productsEn;
  const c = locale === "ru" ? contentRu : contentEn;

  return (
    <AnimatedSection className="px-[60px] py-[100px] max-md:px-5 max-md:py-[60px]">
      <div className="section-label">{c.sectionLabel}</div>
      <h2
        className="font-heading font-bold uppercase tracking-[1px] mb-14"
        style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
      >
        {c.heading}<span className="text-gold">{c.headingAccent}</span>{c.headingSuffix}
      </h2>

      <div className="grid grid-cols-3 gap-[2px] max-md:grid-cols-1">
        {products.map((product, i) => (
          <Link
            key={i}
            href={product.href}
            className="group relative block bg-surface p-[44px_36px] border border-gold-border-06 no-underline text-inherit transition-all duration-400 overflow-hidden hover:border-gold-border hover:-translate-y-1 max-md:p-7"
          >
            {/* Hover bg */}
            <div className="absolute inset-0 bg-gold-dim opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            {/* Bottom gold line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

            <div className="relative">
              <div className="mb-6">{icons[i]}</div>
              <span className="block text-[11px] tracking-[1.5px] uppercase text-gold mb-4">
                {product.tag}
              </span>
              <div className="font-heading font-bold text-[22px] uppercase tracking-[2px] mb-3">
                {product.name}
              </div>
              <p className="text-muted text-[14px] leading-[1.7] mb-8">
                {product.description}
              </p>
              <span className="flex items-center gap-2 text-[12px] tracking-[2px] uppercase text-gold">
                {product.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </AnimatedSection>
  );
}
