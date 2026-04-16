import { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "О Вадиме Радукане — разработчик и предприниматель",
  description:
    "Вадим Радукан — разработчик и предприниматель. Строю IT-продукты для малого бизнеса.",
  alternates: { canonical: "https://raducan.pro/about" },
};

const experienceRu = [
  {
    num: "01",
    title: "Raducan",
    text: "Основатель экосистемы IT-продуктов: Hookah CRM, Capital, Tech. Разрабатываю и управляю.",
  },
  {
    num: "02",
    title: "Остров Lounge",
    text: "Управляющий кальянным баром в Москве. Операционка, персонал, финансы.",
  },
  {
    num: "03",
    title: "RoboWeb (2022–2023)",
    text: "Руководил командой разработки, вёл Яндекс Директ бюджетом 150к₽/мес.",
  },
  {
    num: "04",
    title: "Фриланс",
    text: "Сайты, Telegram-боты, SaaS-продукты для малого бизнеса на Профи.ру и по рекомендациям.",
  },
];

const experienceEn = [
  {
    num: "01",
    title: "Raducan",
    text: "Founder of the IT product ecosystem: Hookah CRM, Capital, Tech. Developing and managing.",
  },
  {
    num: "02",
    title: "Ostrov Lounge",
    text: "Manager of a hookah bar in Moscow. Operations, staff, finances.",
  },
  {
    num: "03",
    title: "RoboWeb (2022–2023)",
    text: "Led the development team, managed Yandex Direct with a budget of 150k RUB/month.",
  },
  {
    num: "04",
    title: "Freelance",
    text: "Websites, Telegram bots, SaaS products for small businesses via Profi.ru and referrals.",
  },
];

const contentRu = {
  tagline: "Raducan · Основатель",
  firstName: "Вадим",
  lastName: "Радукан",
  subtitle: "Разработчик и предприниматель. Строю IT-продукты для малого бизнеса.",
  sectionLabel: "История",
  cityAccent: "Москва",
  bio1: "Родился в Яловень, Молдова. Учился в РГАУ-МСХА в Москве. Карьера пошла в IT.",
  bio2: "Сейчас — разработчик и управляющий Остров Lounge в Москве. Строю продукты для бизнеса.",
};

const contentEn = {
  tagline: "Raducan · Founder",
  firstName: "Vadim",
  lastName: "Radukan",
  subtitle: "Developer and entrepreneur. Building IT products for small businesses.",
  sectionLabel: "Story",
  cityAccent: "Moscow",
  bio1: "Born in Ialoveni, Moldova. Studied at RGAU-MSHA in Moscow. Career moved into IT.",
  bio2: "Currently a developer and manager of Ostrov Lounge in Moscow. Building products for business.",
};

const stack = [
  "Next.js",
  "React",
  "FastAPI",
  "Docker",
  "TypeScript",
  "PostgreSQL",
];

export default async function AboutPage() {
  const locale = await getLocale();
  const experience = locale === "ru" ? experienceRu : experienceEn;
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
            {c.firstName}
            <br />
            <span className="text-gold">{c.lastName}</span>
          </h1>
          <p className="text-muted text-[17px] leading-[1.7] max-w-[500px]">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Bio + Experience */}
      <AnimatedSection
        className="px-[60px] py-[100px] max-md:px-5 max-md:py-[60px]"
        style={{ borderTop: "1px solid rgba(212,175,55,0.06)" }}
      >
        <div className="grid grid-cols-[1fr_1.6fr] gap-20 items-start max-md:grid-cols-1 max-md:gap-10">
          {/* Left - Bio */}
          <div>
            <div className="section-label">{c.sectionLabel}</div>
            <h3
              className="font-heading font-bold uppercase tracking-[1px] leading-[1.1] mb-5"
              style={{ fontSize: "28px" }}
            >
              <span className="text-gold">{c.cityAccent}</span>
            </h3>
            <p className="text-muted leading-[1.8] mb-4">
              {c.bio1}
            </p>
            <p className="text-muted leading-[1.8] mb-8">
              {c.bio2}
            </p>

            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] tracking-[1px] px-[14px] py-1.5 border border-gold-border text-muted uppercase transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Experience */}
          <div className="flex flex-col">
            {experience.map((item) => (
              <div
                key={item.num}
                className="grid grid-cols-[48px_1fr] gap-6 items-start py-7"
                style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
              >
                <span className="font-heading font-[900] text-[13px] text-gold tracking-[1px] pt-[3px]">
                  {item.num}
                </span>
                <div>
                  <div className="font-heading font-semibold text-[16px] uppercase tracking-[1px] mb-1.5">
                    {item.title}
                  </div>
                  <p className="text-muted text-[14px] leading-[1.7]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
