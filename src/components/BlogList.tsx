"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

interface BlogListProps {
  posts: Post[];
  locale: string;
}

const categoriesRu = [
  { key: "all", label: "Все" },
  { key: "HoReCa", label: "HoReCa" },
  { key: "Инвестиции", label: "Инвестиции" },
  { key: "Разработка", label: "Разработка" },
  { key: "Личный бренд", label: "Личный бренд" },
];

const categoriesEn = [
  { key: "all", label: "All" },
  { key: "HoReCa", label: "HoReCa" },
  { key: "Инвестиции", label: "Investments" },
  { key: "Разработка", label: "Development" },
  { key: "Личный бренд", label: "Personal brand" },
];

export function BlogList({ posts, locale }: BlogListProps) {
  const [filter, setFilter] = useState("all");
  const categories = locale === "ru" ? categoriesRu : categoriesEn;
  const readCta = locale === "ru" ? "Читать" : "Read";

  const filtered =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);

  // Count per category
  const counts: Record<string, number> = { all: posts.length };
  posts.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return (
    <>
      {/* Category filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const count = counts[cat.key] || 0;
          if (cat.key !== "all" && count === 0) return null;
          return (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 text-[12px] tracking-[1.5px] uppercase font-medium transition-all duration-300 ${
                filter === cat.key
                  ? "bg-gold text-bg"
                  : "border border-gold-border text-gold hover:bg-gold-dim"
              }`}
            >
              {cat.label}
              <span className="ml-2 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Posts grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <Card
                href={`/blog/${post.slug}`}
                tag={post.category}
                title={post.title}
                description={post.description}
                cta={readCta}
              >
                <p className="mt-3 text-xs text-muted">{post.date}</p>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted">
          {locale === "ru"
            ? "В этой категории пока нет статей."
            : "No articles in this category yet."}
        </p>
      )}
    </>
  );
}
