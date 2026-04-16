import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://raducan.pro";

  const routes = [
    "",
    "/about",
    "/projects",
    "/projects/hookah",
    "/projects/capital",
    "/projects/tech",
    "/contact",
    "/reviews",
    "/blog",
    "/glossary",
    "/tools",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
