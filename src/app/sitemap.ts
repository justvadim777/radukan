import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

const locales = ["ru", "en"];
const defaultLocale = "ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://raducan.pro";

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/glossary",
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "/blog" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );

  const blogSlugs = getAllSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
        ),
      },
    }))
  );

  return [...staticPages, ...blogPages];
}
