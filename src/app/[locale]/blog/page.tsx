import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card } from "@/components/Card";
import { getLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Блог Raducan — HoReCa, инвестиции, разработка",
  description:
    "Статьи о CRM для HoReCa, инвестициях, разработке и автоматизации бизнеса.",
  alternates: { canonical: "https://raducan.pro/blog" },
};

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = getAllPosts(locale);

  const heading = locale === "ru" ? "Блог" : "Blog";
  const subtitle =
    locale === "ru"
      ? "Статьи о бизнесе, инвестициях и разработке."
      : "Articles about business, investments, and development.";
  const readCta = locale === "ru" ? "Читать" : "Read";

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">{heading}</h1>
      <p className="mt-4 text-lg text-muted">{subtitle}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            href={`/blog/${post.slug}`}
            tag={post.category}
            title={post.title}
            description={post.description}
            cta={readCta}
          >
            <p className="mt-3 text-xs text-muted">{post.date}</p>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-12 text-center text-muted">
          {locale === "ru" ? "Статьи скоро появятся." : "Articles coming soon."}
        </p>
      )}
    </AnimatedSection>
  );
}
