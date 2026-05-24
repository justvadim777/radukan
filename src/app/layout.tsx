import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "РАДУКАН — Умные системы. Связанный результат.",
    template: "%s | РАДУКАН",
  },
  description:
    "Учёт клиентов, онлайн-сервисы и автоматизация для малого бизнеса. Создаю продукты для общепита, инвестиций и автоматизации — от первой версии до масштабирования.",
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
  alternates: {
    canonical: "https://raducan.pro",
    languages: {
      ru: "https://raducan.pro/ru",
      en: "https://raducan.pro/en",
    },
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
  sameAs: ["https://t.me/Raducanpro", "https://github.com/justvadim777"],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "FastAPI",
    "Docker",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YZEMX47YBL"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','G-YZEMX47YBL');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108598001','ym');
              ym(108598001,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108598001"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
