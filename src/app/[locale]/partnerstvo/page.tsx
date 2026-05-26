import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { AnimatedSection } from "@/components/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "partnerstvo", "/partnerstvo");
}

const checkIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const searchIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const folderIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3h7l3 4h8v12H3z" />
  </svg>
);

const codeIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const chartIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const layoutIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const trendingIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default async function PartnerstvoPage() {
  const t = await getTranslations("partnerstvo");

  const counters = [
    { num: t("hero.counter1.num"), label: t("hero.counter1.label") },
    { num: t("hero.counter2.num"), label: t("hero.counter2.label") },
    { num: t("hero.counter3.num"), label: t("hero.counter3.label") },
  ];

  const steps = [
    { num: "01", title: t("how.step1.title"), text: t("how.step1.text"), icon: searchIcon },
    { num: "02", title: t("how.step2.title"), text: t("how.step2.text"), icon: folderIcon },
    { num: "03", title: t("how.step3.title"), text: t("how.step3.text"), icon: codeIcon },
    { num: "04", title: t("how.step4.title"), text: t("how.step4.text"), icon: chartIcon },
  ];

  const services = [
    { title: t("services.site.title"), text: t("services.site.text"), icon: layoutIcon },
    { title: t("services.seo.title"), text: t("services.seo.text"), icon: searchIcon },
    { title: t("services.traffic.title"), text: t("services.traffic.text"), icon: trendingIcon },
    { title: t("services.analytics.title"), text: t("services.analytics.text"), icon: chartIcon },
  ];

  const audienceItems = [
    t("audience.item1"),
    t("audience.item2"),
    t("audience.item3"),
    t("audience.item4"),
    t("audience.item5"),
    t("audience.item6"),
  ];

  const clientItems = [
    t("protect.client.item1"),
    t("protect.client.item2"),
    t("protect.client.item3"),
    t("protect.client.item4"),
    t("protect.client.item5"),
  ];

  const usItems = [
    t("protect.us.item1"),
    t("protect.us.item2"),
    t("protect.us.item3"),
    t("protect.us.item4"),
  ];

  const faqItems = [
    { q: t("faq.q1.question"), a: t("faq.q1.answer") },
    { q: t("faq.q2.question"), a: t("faq.q2.answer") },
    { q: t("faq.q3.question"), a: t("faq.q3.answer") },
    { q: t("faq.q4.question"), a: t("faq.q4.answer") },
    { q: t("faq.q5.question"), a: t("faq.q5.answer") },
    { q: t("faq.q6.question"), a: t("faq.q6.answer") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-[140px] pb-[80px] relative overflow-hidden max-md:pt-[100px] max-md:pb-[60px]">
        <div
          className="absolute -top-[100px] right-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(45,125,255,0.07) 0%, transparent 70%)",
          }}
        />
        <p className="eyebrow">{t("hero.eyebrow")}</p>
        <h1
          className="font-bold leading-[1.08] tracking-[-0.04em] mb-5 max-w-[760px]"
          style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          {t("hero.title")}
          <br />
          <span
            className="text-[#56c7ff]"
            style={{ textShadow: "0 0 28px rgba(45,125,255,.38)" }}
          >
            {t("hero.titleAccent")}
          </span>
        </h1>
        <p className="text-[18px] font-semibold text-[#66a8ff] tracking-wide mb-3 max-w-[560px]">
          {t("hero.sub")}
        </p>
        <p className="text-[16px] text-[#8fa6bf] leading-[1.75] mb-10 max-w-[540px]">
          {t("hero.lead")}
        </p>
        <div className="flex flex-wrap gap-4 mb-14 max-md:mb-10">
          <Link href="/contact" className="btn btn-primary">
            {t("hero.ctaPrimary")} <span>→</span>
          </Link>
          <a href="#how" className="btn btn-outline">
            {t("hero.ctaSecondary")}
          </a>
        </div>
        <div className="grid grid-cols-3 gap-8 max-w-[440px] max-md:grid-cols-1 max-md:gap-5">
          {counters.map((c, i) => (
            <div key={i}>
              <div
                className="text-[34px] font-extrabold text-white leading-[1]"
                style={{ textShadow: "0 0 20px rgba(45,125,255,.3)" }}
              >
                {c.num}
              </div>
              <div className="text-[12px] text-[#8fa6bf] mt-1.5 leading-[1.4]">
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <AnimatedSection className="section-line py-16">
        <p className="eyebrow">{t("audience.eyebrow")}</p>
        <h2 className="text-[34px] leading-[1.18] tracking-[-0.04em] mb-10 max-w-[560px]">
          {t("audience.title")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audienceItems.map((text, i) => (
            <div key={i} className="card p-6 flex gap-4 items-start">
              <span className="mt-[3px] shrink-0 text-[#7cc2ff]">{checkIcon}</span>
              <p className="text-[14px] leading-[1.65] text-[#a9bbce]">{text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* How */}
      <div id="how">
        <AnimatedSection className="section-line py-16">
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="text-[34px] leading-[1.18] tracking-[-0.04em] mb-2 max-w-[560px]">
            {t("how.title")}
          </h2>
          <p className="text-[15px] text-[#8fa6bf] mb-10">{t("how.lead")}</p>
          <div className="relative grid grid-cols-2 gap-7 md:grid-cols-4">
            <div
              className="absolute hidden md:block"
              style={{
                left: "8%",
                right: "8%",
                top: "25px",
                borderTop: "1px dashed rgba(112,180,255,.35)",
              }}
            />
            {steps.map((step) => (
              <article key={step.num} className="relative z-[1]">
                <span className="text-[13px] font-extrabold text-[#68aaff]">
                  {step.num}
                </span>
                <div className="mt-3 mb-[22px] grid h-[46px] w-[46px] place-items-center rounded-[11px] border border-[var(--line-strong)] text-[#7cc2ff] bg-[#061426]">
                  {step.icon}
                </div>
                <h3 className="text-sm uppercase tracking-[0.04em] text-[#9bcaff] font-semibold mb-1">
                  {step.title}
                </h3>
                <p className="text-sm leading-[1.58] text-[#9badc2]">{step.text}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Services */}
      <AnimatedSection className="section-line py-16">
        <p className="eyebrow">{t("services.eyebrow")}</p>
        <h2 className="text-[34px] leading-[1.18] tracking-[-0.04em] mb-8 max-w-[560px]">
          {t("services.title")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={i}
              className="card min-h-[180px] p-[30px] transition-all hover:-translate-y-1"
            >
              <span className="grid h-[46px] w-[46px] place-items-center rounded-[11px] border border-[var(--line-strong)] text-[#7cc2ff] bg-[rgba(24,86,180,0.18)]">
                {s.icon}
              </span>
              <h3 className="mt-[18px] mb-2.5 text-[19px] font-bold">{s.title}</h3>
              <p className="leading-[1.65] text-[#a9bbce]">{s.text}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      {/* Protect */}
      <AnimatedSection className="section-line py-16">
        <p className="eyebrow">{t("protect.eyebrow")}</p>
        <h2 className="text-[34px] leading-[1.18] tracking-[-0.04em] mb-3 max-w-[560px]">
          {t("protect.title")}
        </h2>
        <p className="text-[15px] text-[#8fa6bf] mb-10 max-w-[560px]">
          {t("protect.lead")}
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card p-8">
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-[#9bcaff] mb-5">
              {t("protect.client.title")}
            </h3>
            <ul className="flex flex-col gap-3">
              {clientItems.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-[3px] shrink-0 text-[#7cc2ff]">{checkIcon}</span>
                  <span className="text-[14px] leading-[1.65] text-[#a9bbce]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-8">
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-[#9bcaff] mb-5">
              {t("protect.us.title")}
            </h3>
            <ul className="flex flex-col gap-3">
              {usItems.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-[3px] shrink-0 text-[#7cc2ff]">{checkIcon}</span>
                  <span className="text-[14px] leading-[1.65] text-[#a9bbce]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection className="section-line py-16">
        <p className="eyebrow">{t("faq.eyebrow")}</p>
        <h2 className="text-[34px] leading-[1.18] tracking-[-0.04em] mb-10 max-w-[560px]">
          {t("faq.title")}
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {faqItems.map((item, i) => (
            <div key={i} className="card p-6">
              <h3 className="text-[15px] font-bold mb-3 text-[#eef6ff]">{item.q}</h3>
              <p className="text-[14px] leading-[1.72] text-[#a9bbce]">{item.a}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Contact CTA */}
      <section className="my-[30px] flex flex-col items-center justify-between gap-6 card p-[30px_38px] md:flex-row">
        <div>
          <h2 className="mb-1.5 text-2xl font-bold">{t("contact.title")}</h2>
          <p className="text-[#a9bbce] leading-[1.65] max-w-[480px]">{t("contact.lead")}</p>
        </div>
        <Link href="/contact" className="btn btn-primary whitespace-nowrap">
          {t("contact.cta")} <span>→</span>
        </Link>
      </section>
    </>
  );
}
