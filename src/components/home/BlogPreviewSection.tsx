"use client";

import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useLocale } from "next-intl";

const postsRu = [
  {
    href: "/blog" as const,
    cat: "HoReCa",
    title: "Как выбрать CRM для кальянной в 2025 году",
    date: "15 апр 2025",
    time: "8 мин",
    label: "CRM",
  },
  {
    href: "/blog" as const,
    cat: "Инвестиции",
    title: "DCA-стратегия: как инвестировать без нервов",
    date: "8 апр 2025",
    time: "6 мин",
    label: "DCA",
  },
  {
    href: "/blog" as const,
    cat: "Разработка",
    title: "Как запустить SaaS-продукт за 4 недели",
    date: "1 апр 2025",
    time: "10 мин",
    label: "SaaS",
  },
];

const postsEn = [
  {
    href: "/blog" as const,
    cat: "HoReCa",
    title: "How to choose a CRM for a hookah lounge in 2025",
    date: "Apr 15, 2025",
    time: "8 min",
    label: "CRM",
  },
  {
    href: "/blog" as const,
    cat: "Investments",
    title: "DCA strategy: how to invest without stress",
    date: "Apr 8, 2025",
    time: "6 min",
    label: "DCA",
  },
  {
    href: "/blog" as const,
    cat: "Development",
    title: "How to launch a SaaS product in 4 weeks",
    date: "Apr 1, 2025",
    time: "10 min",
    label: "SaaS",
  },
];

const contentRu = {
  sectionLabel: "Блог",
  heading: "Статьи",
  allArticles: "Все статьи",
};

const contentEn = {
  sectionLabel: "Blog",
  heading: "Articles",
  allArticles: "All articles",
};

export function BlogPreviewSection() {
  const locale = useLocale();
  const posts = locale === "ru" ? postsRu : postsEn;
  const c = locale === "ru" ? contentRu : contentEn;

  return (
    <AnimatedSection
      className="px-[60px] py-[100px] max-md:px-5 max-md:py-[60px]"
      style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="section-label">{c.sectionLabel}</div>
          <h2
            className="font-heading font-bold uppercase tracking-[1px]"
            style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
          >
            {c.heading}
          </h2>
        </div>
        <Link
          href="/blog"
          className="border border-gold-border text-text px-5 py-[10px] font-heading font-semibold text-[11px] tracking-[2px] uppercase no-underline transition-all duration-300 hover:border-gold hover:text-gold max-md:hidden"
        >
          {c.allArticles}
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-[2px] max-md:grid-cols-1">
        {posts.map((post, i) => (
          <Link
            key={i}
            href={post.href}
            className="group block bg-surface border border-gold-border-06 no-underline text-inherit transition-all duration-400 overflow-hidden hover:border-gold-border hover:-translate-y-1"
          >
            {/* Image area */}
            <div className="h-[180px] bg-surface2 relative overflow-hidden">
              <div className="w-full h-full bg-[linear-gradient(135deg,#1a1c1e_0%,#232528_100%)] flex items-center justify-center font-heading font-[900] text-[48px] text-gold/15 tracking-[4px]">
                {post.label}
              </div>
            </div>
            {/* Content */}
            <div className="p-6">
              <div className="text-[10px] tracking-[2px] uppercase text-gold mb-2.5">
                {post.cat}
              </div>
              <div className="font-heading font-semibold text-[16px] leading-[1.4] mb-3 transition-colors duration-300 group-hover:text-gold">
                {post.title}
              </div>
              <div className="text-[12px] text-muted flex gap-4">
                <span>{post.date}</span>
                <span>{post.time}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AnimatedSection>
  );
}
