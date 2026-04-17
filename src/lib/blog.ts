import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  cta?: string;
  ctaLink?: string;
  content: string;
  locale: string;
}

export function getAllPosts(locale: string = "ru"): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const filePath = path.join(contentDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      const postLocale = data.locale || "ru";
      if (postLocale !== locale) return null;

      return {
        slug: filename.replace(".mdx", ""),
        title: data.title || "",
        seoTitle: data.seoTitle || data.title || "",
        description: data.description || "",
        date: data.date || "",
        category: data.category || "",
        tags: data.tags || [],
        cta: data.cta,
        ctaLink: data.ctaLink,
        content,
        locale: postLocale,
      } as BlogPost;
    })
    .filter(Boolean) as BlogPost[];

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "",
    seoTitle: data.seoTitle || data.title || "",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "",
    tags: data.tags || [],
    cta: data.cta,
    ctaLink: data.ctaLink,
    content,
    locale: data.locale || "ru",
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
