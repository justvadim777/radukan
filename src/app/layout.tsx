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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
