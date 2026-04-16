"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

const posts = [
  {
    href: "/blog",
    tag: "HoReCa",
    title: "Зачем кальянной CRM-система",
    description:
      "Разбираемся, почему Excel и блокнот — не инструменты управления заведением.",
  },
  {
    href: "/blog",
    tag: "Инвестиции",
    title: "DCA-стратегия: как инвестировать регулярно",
    description:
      "Что такое Dollar Cost Averaging и как автоматизировать регулярные покупки.",
  },
  {
    href: "/blog",
    tag: "Разработка",
    title: "MVP за 2 недели: реально ли?",
    description:
      "Мой подход к быстрой разработке продуктов для малого бизнеса.",
  },
];

export function BlogPreviewSection() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading title="Блог" subtitle="Последние статьи" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <Card key={i} {...post} cta="Читать" />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/blog" variant="secondary">
          Все статьи
        </Button>
      </div>
    </AnimatedSection>
  );
}
