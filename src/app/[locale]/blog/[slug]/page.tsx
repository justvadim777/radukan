import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.description,
    alternates: {
      canonical: `https://raducan.pro/${locale}/blog/${slug}`,
      languages: {
        ru: `https://raducan.pro/ru/blog/${slug}`,
        en: `https://raducan.pro/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Вадим Радукан",
      url: "https://raducan.pro",
    },
    publisher: {
      "@type": "Person",
      name: "Вадим Радукан",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="px-[60px] pt-[140px] pb-[60px] relative overflow-hidden max-md:px-5 max-md:pt-[120px] max-md:pb-10">
        <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="max-w-[760px]">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/blog"
              className="text-[11px] tracking-[2px] uppercase text-gold no-underline hover:text-text transition-colors"
            >
              ← {post.locale === "ru" ? "Блог" : "Blog"}
            </Link>
            <span className="text-muted text-[11px]">·</span>
            <span className="text-[11px] tracking-[1.5px] uppercase text-gold">
              {post.category}
            </span>
          </div>
          <h1
            className="font-heading font-[900] uppercase leading-[1.05] tracking-[-0.5px] mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {post.title}
          </h1>
          <p className="text-muted text-[15px]">{post.date}</p>
        </div>
      </section>

      {/* Content */}
      <AnimatedSection
        className="px-[60px] pb-[80px] max-md:px-5 max-md:pb-[60px]"
        style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
      >
        <article className="max-w-[760px] pt-12 prose-raducan">
          <MDXRemote source={post.content} />
        </article>
      </AnimatedSection>

      {/* CTA */}
      {post.cta && (
        <AnimatedSection className="px-[60px] py-[80px] text-center max-md:px-5 max-md:py-[60px]">
          <div className="max-w-[600px] mx-auto border border-gold-border bg-surface p-10">
            <h3 className="font-heading font-bold text-[20px] uppercase tracking-[1px]">
              {post.cta}
            </h3>
            <div className="mt-6">
              <Link
                href={(post.ctaLink || "/contact") as "/"}
                className="bg-gold text-bg px-8 py-[14px] font-heading font-bold text-[13px] tracking-[2px] uppercase no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                {post.locale === "ru" ? "Подробнее" : "Learn more"}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  );
}
