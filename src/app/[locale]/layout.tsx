import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Per-page metadata is set in each page.tsx via buildPageMetadata helper.
// The root /[locale]/page.tsx (home) sets its own metadata too.

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="relative z-10 mx-auto w-[min(1280px,calc(100%-56px))] flex-1">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
