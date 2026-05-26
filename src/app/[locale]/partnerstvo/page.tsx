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
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">
            {/* Left column — text */}
            <div>
              <div className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#4F8EFF]">
                {t("hero.eyebrow")}
              </div>
              <h1 className="mt-5 text-[44px] lg:text-[68px] font-bold leading-[1.05] tracking-[-0.025em]">
                {t("hero.title")}
                <br />
                <span className="text-[#5B9CFF]">{t("hero.titleAccent")}</span>
              </h1>
              <p className="mt-6 text-[18px] lg:text-[20px] font-semibold text-[#5B9CFF] max-w-[520px]">
                {t("hero.sub")}
              </p>
              <p className="mt-6 text-[16px] lg:text-[17px] text-[#A8B5CC] max-w-[560px] leading-[1.7]">
                {t("hero.lead")}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#3B82F6] text-white px-[22px] py-[11px] rounded-[8px] font-semibold text-[14px] shadow-[0_0_0_1px_rgba(91,156,255,0.3),0_4px_16px_rgba(59,130,246,0.25)] hover:bg-[#5B9CFF] hover:-translate-y-[1px] transition-all duration-200"
                >
                  {t("hero.ctaPrimary")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 bg-white/[0.04] text-[#E8EEF7] border border-[#1F3354] px-[22px] py-[11px] rounded-[8px] font-semibold text-[14px] hover:bg-white/[0.08] hover:border-[#3B82F6] transition-all duration-200"
                >
                  {t("hero.ctaSecondary")}
                </a>
              </div>
            </div>

            {/* Right column — partnership cycle SVG */}
            <div className="hidden lg:block">
              <PartnershipCycle />
            </div>
          </div>

          {/* Counters — full width below */}
          <div className="mt-16 pt-12 border-t border-[#15263E]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {counters.map((c, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 border border-[#1F3354] rounded-md flex items-center justify-center text-[#5B9CFF] shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[22px] font-bold leading-none">{c.num}</div>
                    <div className="text-[13px] text-[#A8B5CC] mt-1">{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

function PartnershipCycle() {
  const nodes = [
    { x: 240, y: 60, label: "САЙТ", sub: "01" },
    { x: 420, y: 240, label: "ЗАЯВКИ", sub: "02" },
    { x: 240, y: 420, label: "ПРОДАЖИ", sub: "03" },
    { x: 60, y: 240, label: "РАСЧЁТ", sub: "04" },
  ];

  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden="true"
    >
      <defs>
        <pattern id="cycle-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1F3354" strokeWidth="0.5" />
        </pattern>
        <marker id="cycle-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse">
          <path d="M 0 0 L 8 5 L 0 10 L 2 5 z" fill="#5B9CFF" />
        </marker>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.25)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </radialGradient>
      </defs>
      <rect width="480" height="480" fill="url(#cycle-grid)" opacity="0.6" />
      <path d="M 280 95 Q 380 110 405 215" fill="none" stroke="#3B82F6" strokeWidth="1.25" strokeDasharray="2 4" markerEnd="url(#cycle-arrow)" />
      <path d="M 405 280 Q 380 380 280 405" fill="none" stroke="#3B82F6" strokeWidth="1.25" strokeDasharray="2 4" markerEnd="url(#cycle-arrow)" />
      <path d="M 200 405 Q 100 380 75 280" fill="none" stroke="#3B82F6" strokeWidth="1.25" strokeDasharray="2 4" markerEnd="url(#cycle-arrow)" />
      <path d="M 75 215 Q 100 110 200 95" fill="none" stroke="#3B82F6" strokeWidth="1.25" strokeDasharray="2 4" markerEnd="url(#cycle-arrow)" />
      <line x1="240" y1="240" x2="240" y2="100" stroke="#1F3354" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="380" y2="240" stroke="#1F3354" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="240" y2="380" stroke="#1F3354" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="100" y2="240" stroke="#1F3354" strokeWidth="0.5" />
      <circle cx="240" cy="240" r="48" fill="url(#node-glow)" />
      <circle cx="240" cy="240" r="32" fill="#0A1628" stroke="#3B82F6" strokeWidth="1" />
      <text x="240" y="237" fill="#5B9CFF" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="1.5">ЦИКЛ</text>
      <text x="240" y="252" fill="#A8B5CC" fontFamily="Inter, system-ui, sans-serif" fontSize="8" textAnchor="middle">партнёрства</text>
      {nodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r="42" fill="url(#node-glow)" />
          <rect x={node.x - 32} y={node.y - 32} width="64" height="64" rx="8" fill="#13243D" stroke="#3B82F6" strokeWidth="1.25" />
          <text x={node.x} y={node.y - 8} fill="#5B9CFF" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="1">{node.sub}</text>
          <text x={node.x} y={node.y + 12} fill="#E8EEF7" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1.2">{node.label}</text>
          <path d={`M ${node.x - 32} ${node.y - 32} l 4 0 M ${node.x - 32} ${node.y - 32} l 0 4`} stroke="#5B9CFF" strokeWidth="1.25" />
          <path d={`M ${node.x + 32} ${node.y - 32} l -4 0 M ${node.x + 32} ${node.y - 32} l 0 4`} stroke="#5B9CFF" strokeWidth="1.25" />
          <path d={`M ${node.x - 32} ${node.y + 32} l 4 0 M ${node.x - 32} ${node.y + 32} l 0 -4`} stroke="#5B9CFF" strokeWidth="1.25" />
          <path d={`M ${node.x + 32} ${node.y + 32} l -4 0 M ${node.x + 32} ${node.y + 32} l 0 -4`} stroke="#5B9CFF" strokeWidth="1.25" />
        </g>
      ))}
      <text x="12" y="20" fill="#6E7E99" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.5">RADUCAN · СХЕМА</text>
      <text x="468" y="20" fill="#6E7E99" fontFamily="JetBrains Mono, monospace" fontSize="8" textAnchor="end" letterSpacing="0.5">v.1</text>
      <text x="12" y="472" fill="#6E7E99" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.5">ПАРТНЁРСТВО ПО РЕЗУЛЬТАТУ</text>
    </svg>
  );
}
