import { buildPageMetadata } from "@/lib/seo";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "projects", "/projects");
}

const projectsRu = [
  {
    href: "/projects/hookah" as const,
    tag: "CRM · HoReCa",
    name: "Hookah",
    description:
      "Облачная CRM для автоматизации кальянных. Гости, бронирования, лояльность, аналитика. Тест-среда — Остров Lounge, Москва.",
    badges: ["Next.js", "PostgreSQL", "Docker"],
    cta: "Подробнее",
  },
  {
    href: "/projects/capital" as const,
    tag: "SaaS · Инвестиции",
    name: "Capital",
    description:
      "Мультипортфельный инвестиционный дашборд. Тинькофф + БКС + Bybit в одном месте. Аналитика, цели, история транзакций.",
    badges: ["Next.js", "Recharts", "Prisma"],
    cta: "Подробнее",
  },
  {
    href: "/projects/tech" as const,
    tag: "Разработка · Фриланс",
    name: "Tech",
    description:
      "Разработка сайтов, Telegram-ботов и SaaS-продуктов под ключ. Для малого бизнеса. От 50к₽.",
    badges: ["React", "FastAPI", "Telegram"],
    cta: "Обсудить",
  },
];

const projectsEn = [
  {
    href: "/projects/hookah" as const,
    tag: "CRM · HoReCa",
    name: "Hookah",
    description:
      "Cloud CRM for hookah lounge automation. Guests, reservations, loyalty, analytics. Test environment — Ostrov Lounge, Moscow.",
    badges: ["Next.js", "PostgreSQL", "Docker"],
    cta: "Learn more",
  },
  {
    href: "/projects/capital" as const,
    tag: "SaaS · Investments",
    name: "Capital",
    description:
      "Multi-portfolio investment dashboard. Tinkoff + BCS + Bybit in one place. Analytics, goals, transaction history.",
    badges: ["Next.js", "Recharts", "Prisma"],
    cta: "Learn more",
  },
  {
    href: "/projects/tech" as const,
    tag: "Development · Freelance",
    name: "Tech",
    description:
      "Website, Telegram bot, and SaaS product development. For small businesses. From 50k RUB.",
    badges: ["React", "FastAPI", "Telegram"],
    cta: "Discuss",
  },
];

const contentRu = {
  tagline: "Raducan · Продукты",
  headingLine1: "Все",
  headingAccent: "проекты",
  subtitle: "Три продукта. Один бренд. HoReCa, инвестиции, разработка.",
};

const contentEn = {
  tagline: "Raducan · Products",
  headingLine1: "All",
  headingAccent: "projects",
  subtitle: "Three products. One brand. HoReCa, investments, development.",
};

export default async function ProjectsPage() {
  const locale = await getLocale();
  const projects = locale === "ru" ? projectsRu : projectsEn;
  const c = locale === "ru" ? contentRu : contentEn;

  return (
    <>
      {/* Hero */}
      <section className="px-[60px] pt-[140px] pb-[80px] relative overflow-hidden max-md:px-5 max-md:pt-[120px] max-md:pb-[60px]">
        <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="max-w-[700px]">
          <div className="flex items-center gap-[10px] text-[11px] tracking-[3px] uppercase text-gold mb-5">
            <span className="w-5 h-px bg-gold" />
            {c.tagline}
          </div>
          <h1
            className="font-heading font-[900] uppercase leading-[1.0] tracking-[-0.5px] mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {c.headingLine1}
            <br />
            <span className="text-gold">{c.headingAccent}</span>
          </h1>
          <p className="text-muted text-[17px] leading-[1.7] max-w-[500px]">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Grid */}
      <AnimatedSection
        className="px-[60px] pb-[100px] max-md:px-5 max-md:pb-[60px]"
        style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
      >
        <div className="grid grid-cols-3 gap-[2px] max-md:grid-cols-1">
          {projects.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="group relative block bg-surface p-[44px_36px] border border-gold-border-06 no-underline text-inherit transition-all duration-400 overflow-hidden hover:border-gold-border hover:-translate-y-1 max-md:p-7"
            >
              <div className="absolute inset-0 bg-gold-dim opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              <div className="relative">
                <span className="block text-[11px] tracking-[1.5px] uppercase text-gold mb-4">
                  {p.tag}
                </span>
                <div className="font-heading font-bold text-[22px] uppercase tracking-[2px] mb-3">
                  {p.name}
                </div>
                <p className="text-muted text-[14px] leading-[1.7] mb-6">
                  {p.description}
                </p>
                <div className="flex gap-2 flex-wrap mb-6">
                  {p.badges.map((b) => (
                    <span
                      key={b}
                      className="text-[10px] tracking-[1px] px-3 py-1 border border-gold-border text-muted uppercase"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-2 text-[12px] tracking-[2px] uppercase text-gold">
                  {p.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </>
  );
}
