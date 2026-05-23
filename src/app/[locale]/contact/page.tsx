import { AnimatedSection } from "@/components/AnimatedSection";
import { getLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "contact", "/contact");
}

const tasksRu = [
  "Разработка сайта",
  "Внедрение CRM",
  "Программа лояльности",
  "Автоматизация процессов",
  "Telegram-бот или Mini-App",
  "Другое / нужна консультация",
];

const tasksEn = [
  "Website development",
  "CRM implementation",
  "Loyalty program",
  "Process automation",
  "Telegram bot or Mini-App",
  "Other / need consultation",
];

const contentRu = {
  tagline: "Raducan · Контакт",
  headingLine1: "Обсудим",
  headingAccent: "задачу",
  subtitle: "Напишите в Telegram — отвечаю быстро. Или заполните форму.",
  contactMethods: "Способы связи",
  taskQuestion: "Для какой задачи?",
};

const contentEn = {
  tagline: "Raducan · Contact",
  headingLine1: "Let's discuss",
  headingAccent: "your task",
  subtitle: "Write on Telegram — I respond quickly. Or fill out the form.",
  contactMethods: "Contact methods",
  taskQuestion: "What's the task?",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const tasks = locale === "ru" ? tasksRu : tasksEn;
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

      {/* Content */}
      <AnimatedSection className="px-[60px] pb-[100px] max-md:px-5 max-md:pb-[60px]">
        <div className="grid grid-cols-2 gap-[60px] max-w-[900px] max-md:grid-cols-1 max-md:gap-10">
          {/* Contact methods */}
          <div>
            <div className="section-label mb-8">{c.contactMethods}</div>
            <div className="flex flex-col gap-4">
              <a
                href="https://t.me/Raducanpro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-6 bg-surface border border-gold-border no-underline text-inherit transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="font-heading font-[900] text-[20px] text-gold">
                  T
                </span>
                <div>
                  <div className="text-[11px] tracking-[1.5px] uppercase text-muted mb-1">
                    Telegram
                  </div>
                  <div className="font-medium">@Raducanpro</div>
                </div>
              </a>
              <a
                href="mailto:vadim@radukan.ru"
                className="flex items-center gap-5 p-6 bg-surface border border-gold-border-06 no-underline text-inherit transition-all duration-300 hover:border-gold-border"
              >
                <span className="font-heading font-[900] text-[20px] text-gold">
                  @
                </span>
                <div>
                  <div className="text-[11px] tracking-[1.5px] uppercase text-muted mb-1">
                    Email
                  </div>
                  <div className="font-medium">vadim@radukan.ru</div>
                </div>
              </a>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <div className="section-label mb-8">{c.taskQuestion}</div>
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <div
                  key={task}
                  className="flex justify-between items-center p-4 border border-gold-border-06 text-[13px] cursor-pointer transition-all duration-300 hover:border-gold-border hover:text-gold"
                >
                  <span>{task}</span>
                  <span className="text-gold">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
