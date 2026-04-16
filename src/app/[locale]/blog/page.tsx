import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card } from "@/components/Card";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Блог Raducan — HoReCa, инвестиции, разработка",
  description:
    "Статьи о CRM для HoReCa, инвестициях, разработке и автоматизации бизнеса.",
  alternates: { canonical: "https://raducan.pro/blog" },
};

const postsRu = [
  {
    slug: "zachem-kalyannoj-crm",
    tag: "HoReCa",
    title: "Зачем кальянной CRM-система",
    description:
      "Разбираемся, почему Excel и блокнот — не инструменты управления заведением.",
    date: "2024-12-15",
    cta: "Читать",
  },
  {
    slug: "dca-strategiya",
    tag: "Инвестиции",
    title: "DCA-стратегия: как инвестировать регулярно",
    description:
      "Что такое Dollar Cost Averaging и как автоматизировать регулярные покупки.",
    date: "2024-12-10",
    cta: "Читать",
  },
  {
    slug: "mvp-za-2-nedeli",
    tag: "Разработка",
    title: "MVP за 2 недели: реально ли?",
    description:
      "Мой подход к быстрой разработке продуктов для малого бизнеса.",
    date: "2024-12-05",
    cta: "Читать",
  },
  {
    slug: "programma-loyalnosti-horeca",
    tag: "HoReCa",
    title: "Программа лояльности для HoReCa",
    description:
      "Как удержать гостей и увеличить повторные визиты с помощью бонусной системы.",
    date: "2024-11-28",
    cta: "Читать",
  },
  {
    slug: "portfolio-diversifikaciya",
    tag: "Инвестиции",
    title: "Диверсификация портфеля: основы",
    description:
      "Почему не стоит класть все яйца в одну корзину и как распределить активы.",
    date: "2024-11-20",
    cta: "Читать",
  },
  {
    slug: "telegram-boty-dlya-biznesa",
    tag: "Разработка",
    title: "Telegram-боты для бизнеса",
    description:
      "5 сценариев автоматизации через Telegram-ботов: от заказов до аналитики.",
    date: "2024-11-15",
    cta: "Читать",
  },
];

const postsEn = [
  {
    slug: "zachem-kalyannoj-crm",
    tag: "HoReCa",
    title: "Why a hookah lounge needs a CRM system",
    description:
      "Why Excel and notepads are not tools for managing a venue.",
    date: "2024-12-15",
    cta: "Read",
  },
  {
    slug: "dca-strategiya",
    tag: "Investments",
    title: "DCA strategy: how to invest regularly",
    description:
      "What is Dollar Cost Averaging and how to automate regular purchases.",
    date: "2024-12-10",
    cta: "Read",
  },
  {
    slug: "mvp-za-2-nedeli",
    tag: "Development",
    title: "MVP in 2 weeks: is it realistic?",
    description:
      "My approach to rapid product development for small businesses.",
    date: "2024-12-05",
    cta: "Read",
  },
  {
    slug: "programma-loyalnosti-horeca",
    tag: "HoReCa",
    title: "Loyalty program for HoReCa",
    description:
      "How to retain guests and increase repeat visits with a bonus system.",
    date: "2024-11-28",
    cta: "Read",
  },
  {
    slug: "portfolio-diversifikaciya",
    tag: "Investments",
    title: "Portfolio diversification: the basics",
    description:
      "Why you shouldn't put all your eggs in one basket and how to allocate assets.",
    date: "2024-11-20",
    cta: "Read",
  },
  {
    slug: "telegram-boty-dlya-biznesa",
    tag: "Development",
    title: "Telegram bots for business",
    description:
      "5 automation scenarios with Telegram bots: from orders to analytics.",
    date: "2024-11-15",
    cta: "Read",
  },
];

const contentRu = {
  heading: "Блог",
  subtitle: "Статьи о бизнесе, инвестициях и разработке.",
};

const contentEn = {
  heading: "Blog",
  subtitle: "Articles about business, investments, and development.",
};

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = locale === "ru" ? postsRu : postsEn;
  const c = locale === "ru" ? contentRu : contentEn;

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">{c.heading}</h1>
      <p className="mt-4 text-lg text-muted">
        {c.subtitle}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            href="/blog"
            tag={post.tag}
            title={post.title}
            description={post.description}
            cta={post.cta}
          >
            <p className="mt-3 text-xs text-muted">{post.date}</p>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
}
