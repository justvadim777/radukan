import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Блог Raducan — HoReCa, инвестиции, разработка",
  description:
    "Статьи о CRM для HoReCa, инвестициях, разработке и автоматизации бизнеса.",
  alternates: { canonical: "https://raducan.pro/blog" },
};

const posts = [
  {
    slug: "zachem-kalyannoj-crm",
    tag: "HoReCa",
    title: "Зачем кальянной CRM-система",
    description:
      "Разбираемся, почему Excel и блокнот — не инструменты управления заведением.",
    date: "2024-12-15",
  },
  {
    slug: "dca-strategiya",
    tag: "Инвестиции",
    title: "DCA-стратегия: как инвестировать регулярно",
    description:
      "Что такое Dollar Cost Averaging и как автоматизировать регулярные покупки.",
    date: "2024-12-10",
  },
  {
    slug: "mvp-za-2-nedeli",
    tag: "Разработка",
    title: "MVP за 2 недели: реально ли?",
    description:
      "Мой подход к быстрой разработке продуктов для малого бизнеса.",
    date: "2024-12-05",
  },
  {
    slug: "programma-loyalnosti-horeca",
    tag: "HoReCa",
    title: "Программа лояльности для HoReCa",
    description:
      "Как удержать гостей и увеличить повторные визиты с помощью бонусной системы.",
    date: "2024-11-28",
  },
  {
    slug: "portfolio-diversifikaciya",
    tag: "Инвестиции",
    title: "Диверсификация портфеля: основы",
    description:
      "Почему не стоит класть все яйца в одну корзину и как распределить активы.",
    date: "2024-11-20",
  },
  {
    slug: "telegram-boty-dlya-biznesa",
    tag: "Разработка",
    title: "Telegram-боты для бизнеса",
    description:
      "5 сценариев автоматизации через Telegram-ботов: от заказов до аналитики.",
    date: "2024-11-15",
  },
];

export default function BlogPage() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">Блог</h1>
      <p className="mt-4 text-lg text-muted">
        Статьи о бизнесе, инвестициях и разработке.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            href={`/blog/${post.slug}`}
            tag={post.tag}
            title={post.title}
            description={post.description}
            cta="Читать"
          >
            <p className="mt-3 text-xs text-muted">{post.date}</p>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
}
