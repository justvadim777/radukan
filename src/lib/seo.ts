import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

const BASE_URL = "https://raducan.pro";
const LOCALES = ["ru", "en"] as const;
type Locale = (typeof LOCALES)[number];

/**
 * Build localized metadata for a page.
 *
 * @param locale - current locale
 * @param pageKey - key under "metadata" namespace in messages/*.json
 * @param path - URL path WITHOUT locale prefix (e.g. "/about", "/projects/hookah", "" for home)
 */
export async function buildPageMetadata(
  locale: string,
  pageKey: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `metadata.${pageKey}` });
  const normalized = path.startsWith("/") || path === "" ? path : `/${path}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE_URL}/${l}${normalized}`;
  }

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}${normalized}`,
      languages,
    },
  };
}
