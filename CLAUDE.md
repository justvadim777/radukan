@AGENTS.md

# radukan — raducan.pro

Personal portfolio site for Vadim Radukan. Bilingual (ru/en), blog with MDX, custom VPS deployment.

## Stack

| Tool | Version |
|---|---|
| Next.js | 16.2.4 |
| React | 19.2.4 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| next-intl | 4.9.1 |
| framer-motion | 12.38.0 |
| @next/mdx + next-mdx-remote | blog MDX rendering |
| gray-matter | frontmatter parsing |
| next-sitemap | sitemap generation |

Runtime: Node.js 20. Deployed via PM2 + Nginx on a Linux VPS.

## Folder structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: GA4, Yandex Metrica, JSON-LD Person schema
│   ├── sitemap.ts
│   ├── robots.ts
│   └── [locale]/           # ALL pages live here — locale is always ru or en
│       ├── layout.tsx      # Navbar + Footer + NextIntlClientProvider
│       ├── page.tsx        # Home
│       ├── about/
│       ├── blog/
│       │   └── [slug]/
│       ├── contact/
│       ├── glossary/
│       ├── projects/
│       │   ├── capital/
│       │   ├── hookah/
│       │   └── tech/
│       ├── reviews/
│       └── tools/
├── components/
│   ├── home/               # HeroSection, StatsSection, ServicesSection, ApproachSection, CaseStudySection, CtaSection
│   ├── Navbar.tsx          # 'use client'
│   ├── Footer.tsx          # 'use client'
│   ├── AnimatedSection.tsx
│   ├── BlogList.tsx
│   ├── Blueprint.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── SectionHeading.tsx
├── content/
│   └── blog/               # *.mdx — all blog posts (locale field in frontmatter distinguishes ru/en)
├── i18n/
│   ├── routing.ts          # locales: [ru, en], defaultLocale: ru
│   ├── request.ts          # getRequestConfig for next-intl
│   └── navigation.ts
├── lib/
│   ├── blog.ts             # getAllPosts(locale), getPostBySlug(slug), getAllSlugs()
│   └── seo.ts              # buildPageMetadata(locale, pageKey, path)
└── middleware.ts            # next-intl routing, excludes /api and static assets

messages/
├── ru.json                 # Russian translations
└── en.json                 # English translations
```

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

No `.env` setup required for basic dev. The site works without env vars locally.

## Deployment

Production: Linux VPS, Node.js 20, PM2 as process manager, Nginx as reverse proxy → port 3000.

**First-time server setup:**
```bash
bash deploy.sh   # installs Node 20, PM2, Nginx, clones repo, builds, starts
```

**Subsequent deploys (on the server):**
```bash
cd /root/radukan
git pull origin main
npm install
npm run build
pm2 restart radukan
```

SSL: Let's Encrypt via `certbot --nginx -d raducan.pro -d www.raducan.pro`.

Remote deploy utilities: `redeploy.py`, `remote_deploy.py`, `swap_and_deploy.py` — scripts for automated remote deployments.

## Key conventions

**i18n:** Every page receives `locale` as a param. All text comes from `messages/ru.json` or `messages/en.json` via `useTranslations()` (client) or `getTranslations()` (server). Namespace keys: `nav`, `footer`, `blueprint`, `metadata.*`.

**SEO metadata:** Every page calls `buildPageMetadata(locale, pageKey, path)` from `src/lib/seo.ts` — it sets canonical URL, hreflang alternates, and pulls titles/descriptions from translations.

**Server vs client components:** Default to Server Components. Add `'use client'` only when you need browser APIs, event handlers, or hooks (e.g., Navbar, Footer, AnimatedSection).

**Styling:** Tailwind v4 utility classes only. Custom design tokens (colors, spacing) are CSS variables defined in `src/app/globals.css` — dark navy theme (`--color-bg: #030811`), accent blue (`--color-blue: #2d7dff`). Never hardcode these hex values — use the CSS variables.

**Blog posts:** MDX files in `src/content/blog/`. Required frontmatter fields:
```yaml
title: "..."
seoTitle: "..."
description: "..."
date: "YYYY-MM-DD"
category: "..."
tags: [...]
locale: ru   # or en
cta: "..."
ctaLink: "..."
```

**Path alias:** `@/` maps to `src/`. Use it everywhere instead of relative paths.

**Analytics:** GA4 (`G-YZEMX47YBL`) and Yandex Metrica (`108598001`) are in the root `app/layout.tsx`. Do not duplicate them in locale layout.
