@AGENTS.md

# radukan — raducan.pro

Сайт-портфолио + услуги Вадима Радукана. Bilingual (ru/en), MDX-блог, custom VPS deployment.

## Project context

**Audience.** Русскоязычные владельцы малого бизнеса в HoReCa (рестораны, бары, кальянные, кофейни) и e-commerce. RU-локаль — основная (default). EN-локаль — для иностранной аудитории.

**Позиционирование (public-facing).** РАДУКАН = оптимизация работы бизнеса через технологии: сайты, CRM-системы, мобильные / Telegram Mini-App, программы лояльности, автоматизация процессов. НЕ «AI-агентство». AI — один из инструментов в стеке, не главный продукт.

## Copywriting constraints (read before any text edits)

- **Не выпячивать «solo + AI»** в публичных текстах. Запрещено: «solo», «один человек», «AI делает за меня», «фрилансер с AI», «один разработчик». Используй: «мы», «команда», «инженерное бюро», «лид проекта», «прямой контакт».
- **168-ФЗ (с 1 марта 2026)** — RU-локаль должна быть на русском.
  - Бренд в RU: `РАДУКАН` (логотип, заголовки) или `Радукан` (в склонении).
  - Английские термины (CRM, SaaS, MVP, HoReCa, ROI, DCA) — давать русское пояснение или заменять русскими эквивалентами.
  - Сохраняем латиницей: доменное имя `raducan.pro`, имена ТЗ (Telegram, GitHub, iiko, amoCRM, n8n, Make, Битрикс24).
  - EN-локаль — не трогаем, остаётся как есть.
- **Не обещать несуществующие продукты.** Страницы `/projects/hookah`, `/projects/capital`, `/projects/tech` и `/reviews` удалены. Не возвращать упоминания `Raducan Hookah`, `Raducan Capital`, `Raducan Tech` как готовых продуктов без явной задачи.
- **Не публиковать цифры кейсов без верификации.** Конкретные `+27%`, `−40%` и т. п. — только если реально измерены, со скриншотом или ссылкой на источник.

## Agent permissions

На этом проекте Claude Code может (и должен) сам:

- `git add` / `commit` / `push` в `main` после задачи.
- Деплоить через `python redeploy.py` (стандартный путь). Альтернативы — `remote_deploy.py`, `swap_and_deploy.py`, `bash deploy.sh` (первичный setup).
- Перезапускать PM2 при необходимости.

После каждой задачи закрывай цикл: правки → `npm run build` → проверка → коммит → пуш → деплой → краткий отчёт в чате.

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

Runtime: Node.js 20. Production: Linux VPS, PM2, Nginx → port 3000. SSL: Let's Encrypt.

## Folder structure

```
src/
├── app/
│   ├── layout.tsx          # Root: GA4, Yandex Metrica, JSON-LD Person schema
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   └── [locale]/           # locale = ru | en
│       ├── layout.tsx      # Navbar + Footer + NextIntlClientProvider
│       ├── page.tsx        # Home: Hero → Stats → Services → Approach → CTA
│       ├── about/
│       ├── blog/[slug]/
│       ├── contact/
│       ├── glossary/
│       └── tools/
├── components/
│   ├── home/               # HeroSection, StatsSection, ServicesSection, ApproachSection, CtaSection
│   ├── Navbar.tsx          # 'use client'
│   ├── Footer.tsx          # 'use client'
│   ├── AnimatedSection.tsx
│   ├── BlogList.tsx
│   ├── Blueprint.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── SectionHeading.tsx
├── content/blog/           # *.mdx — 60+ статей (поле `locale` в frontmatter)
├── i18n/                   # routing.ts, request.ts, navigation.ts
├── lib/                    # blog.ts, seo.ts
└── middleware.ts

messages/
├── ru.json                 # русские переводы (основная аудитория)
└── en.json                 # английские переводы
```

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production
npm run lint
```

## Key conventions

**i18n.** Все тексты — через `messages/ru.json` и `messages/en.json`. `useTranslations()` (client) / `getTranslations()` (server). Namespace keys: `nav`, `footer`, `blueprint`, `hero`, `services`, `approach`, `stats`, `cta`, `metadata.*`. Хардкод текста в компонентах — антипаттерн, выноси в i18n.

**SEO metadata.** Каждая страница вызывает `buildPageMetadata(locale, pageKey, path)` из `src/lib/seo.ts` — он ставит canonical, hreflang и тащит title/description из переводов.

**Server vs client components.** По умолчанию Server Components. `'use client'` — только при необходимости (Navbar, Footer, AnimatedSection — внутри них хуки/события).

**Styling.** Tailwind v4 utility classes. Custom design tokens — CSS variables в `src/app/globals.css`. Сейчас dark navy theme (`--color-bg: #030811`, accent `--color-blue: #2d7dff`). НЕ хардкодить hex'ы — использовать CSS-переменные.

**Blog posts.** MDX в `src/content/blog/`. Обязательные frontmatter поля:
```yaml
title: "..."
seoTitle: "..."
description: "..."
date: "YYYY-MM-DD"
category: "..."
tags: [...]
locale: ru   # или en
cta: "..."
ctaLink: "..."   # обычно /contact
```

**Path alias.** `@/` → `src/`.

**Analytics.** GA4 (`G-YZEMX47YBL`) и Yandex Metrica (`108598001`) — в root `app/layout.tsx`. НЕ дублировать в locale layout.

## Workflow file conventions

- **`TASK.md`** (в корне) — текущая рабочая задача. После выполнения и деплоя содержимое **перезаписывается** новой задачей. История не копится в этом файле.
- **`CLAUDE.md`** (этот файл) — долгоживущий контекст проекта: функционал, ограничения, ключевые соглашения, права агента. Обновляется по факту изменений в проекте, а не после каждой задачи.
