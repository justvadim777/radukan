import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Blueprint } from "@/components/Blueprint";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="section-line relative grid min-h-[610px] grid-cols-1 items-center gap-9 py-16 md:grid-cols-[0.92fr_1.08fr]">
      <div>
        <p className="eyebrow hero-reveal">{t("eyebrow")}</p>

        <h1
          className="mb-6 leading-[0.94] tracking-[-0.065em] hero-reveal-d1"
          style={{ fontSize: "clamp(48px, 5.4vw, 84px)" }}
        >
          {t("h1Line1")}
          <br />
          <span
            className="text-[#66a8ff]"
            style={{ textShadow: "0 0 28px rgba(57,137,255,.42)" }}
          >
            {t("h1Line2")}
          </span>
        </h1>

        <p className="mb-4 text-base font-semibold text-[#66a8ff] tracking-wide hero-reveal-d2">
          {t("subhead")}
        </p>

        <p className="max-w-[460px] text-[17px] leading-[1.75] text-[#c3d2e2] hero-reveal-d3">
          {t("text")}
        </p>

        <div className="mt-9 flex flex-wrap gap-[18px] hero-reveal-d4">
          <Link href="/projects" className="btn btn-primary">
            {t("ctaPrimary")} <span>→</span>
          </Link>
          <Link href="/contact" className="btn btn-outline">
            {t("ctaOutline")}
          </Link>
        </div>
      </div>

      <Blueprint />
    </section>
  );
}
