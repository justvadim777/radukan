import { AnimatedSection } from "@/components/AnimatedSection";
import { BlogList } from "@/components/BlogList";
import { getLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "blog", "/blog");
}

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = getAllPosts(locale);

  const heading = locale === "ru" ? "Блог" : "Blog";
  const subtitle =
    locale === "ru"
      ? "Статьи о бизнесе, инвестициях и разработке."
      : "Articles about business, investments, and development.";

  const serializedPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    category: p.category,
  }));

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">{heading}</h1>
      <p className="mt-4 text-lg text-muted">{subtitle}</p>

      <BlogList posts={serializedPosts} locale={locale} />
    </AnimatedSection>
  );
}
