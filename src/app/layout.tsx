import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Вадим Радукан — разработчик и предприниматель | raducan.pro",
    template: "%s | raducan.pro",
  },
  description:
    "Вадим Радукан — разработчик и предприниматель. Создаю продукты для HoReCa, инвестиций и автоматизации бизнеса.",
  metadataBase: new URL("https://raducan.pro"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://raducan.pro",
    siteName: "raducan.pro",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Вадим Радукан",
  alternateName: "Vadim Radukan",
  url: "https://raducan.pro",
  jobTitle: "Разработчик и предприниматель",
  email: "vadim@radukan.ru",
  sameAs: [
    "https://t.me/MyPROf_IT",
    "https://github.com/justvadim777",
  ],
  knowsAbout: ["Next.js", "React", "TypeScript", "FastAPI", "Docker", "PostgreSQL"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
