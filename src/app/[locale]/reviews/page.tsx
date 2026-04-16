"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const categoriesRu = ["Все", "Фриланс", "Hookah", "Capital"];
const categoriesEn = ["All", "Freelance", "Hookah", "Capital"];

const reviewsRu = [
  {
    name: "Алексей К.",
    category: "Фриланс",
    text: "Вадим сделал сайт за 10 дней. Всё работает, SEO на месте, трафик пошёл через месяц. Рекомендую.",
    rating: 5,
  },
  {
    name: "Марина С.",
    category: "Hookah",
    text: "CRM Raducan Hookah полностью изменила управление нашим баром. Бронирования, аналитика — всё в одном месте.",
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    category: "Capital",
    text: "Наконец вижу все свои портфели в одном месте. Удобный дашборд, понятная аналитика.",
    rating: 4,
  },
  {
    name: "Елена Р.",
    category: "Фриланс",
    text: "Заказывала Telegram-бота для автоматизации заказов. Сделано быстро и качественно. Бот работает без сбоев.",
    rating: 5,
  },
  {
    name: "Игорь М.",
    category: "Hookah",
    text: "Программа лояльности в CRM работает отлично. Гости стали возвращаться чаще.",
    rating: 5,
  },
  {
    name: "Анна Л.",
    category: "Фриланс",
    text: "Профессиональный подход. Чёткие сроки, прозрачное ценообразование. Буду обращаться ещё.",
    rating: 5,
  },
];

const reviewsEn = [
  {
    name: "Alexey K.",
    category: "Freelance",
    text: "Vadim built a website in 10 days. Everything works, SEO is on point, traffic started within a month. Highly recommend.",
    rating: 5,
  },
  {
    name: "Marina S.",
    category: "Hookah",
    text: "Raducan Hookah CRM completely transformed how we manage our bar. Reservations, analytics — all in one place.",
    rating: 5,
  },
  {
    name: "Dmitry V.",
    category: "Capital",
    text: "Finally I can see all my portfolios in one place. Convenient dashboard, clear analytics.",
    rating: 4,
  },
  {
    name: "Elena R.",
    category: "Freelance",
    text: "I ordered a Telegram bot for order automation. Done quickly and with quality. The bot works flawlessly.",
    rating: 5,
  },
  {
    name: "Igor M.",
    category: "Hookah",
    text: "The loyalty program in the CRM works great. Guests started coming back more often.",
    rating: 5,
  },
  {
    name: "Anna L.",
    category: "Freelance",
    text: "Professional approach. Clear deadlines, transparent pricing. Will definitely come back.",
    rating: 5,
  },
];

const contentRu = {
  heading: "Отзывы",
  subtitle: "Что говорят клиенты о работе с Raducan.",
};

const contentEn = {
  heading: "Reviews",
  subtitle: "What clients say about working with Raducan.",
};

export default function ReviewsPage() {
  const locale = useLocale();
  const categories = locale === "ru" ? categoriesRu : categoriesEn;
  const reviews = locale === "ru" ? reviewsRu : reviewsEn;
  const c = locale === "ru" ? contentRu : contentEn;
  const allLabel = locale === "ru" ? "Все" : "All";

  const [filter, setFilter] = useState(allLabel);

  const filtered =
    filter === allLabel
      ? reviews
      : reviews.filter((r) => r.category === filter);

  return (
    <>
      <AnimatedSection className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">{c.heading}</h1>
        <p className="mt-4 text-lg text-muted">
          {c.subtitle}
        </p>
      </AnimatedSection>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-gold text-bg"
                  : "border border-gold-border text-gold hover:bg-gold-dim"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((review, i) => (
            <motion.div
              key={`${review.name}-${filter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-gold-border bg-surface p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center bg-gold-dim text-gold font-heading font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted">{review.category}</p>
                </div>
              </div>
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    className={j < review.rating ? "text-gold" : "text-muted"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
