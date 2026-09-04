import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "IMPACT FINANCE - Tezkor Mikrokredit va Moliyalashtirish Xizmatlari",
  description:
    "Biznes egalari, YTT, yuridik shaxslar va jismoniy shaxslarga 100 000 000 so'mgacha imtiyozli mikrokreditlar. Markaziy Bank Litsenziyasi № 143. 15 daqiqada tezkor ko'rib chiqish.",
  keywords: [
    "impact finance",
    "impact finance mikrokredit",
    "mikrokredit tashkiloti",
    "qarz olish",
    "biznes krediti",
    "jismoniy shaxslar uchun kredit",
    "yuridik shaxslar uchun kredit",
    "moliyaviy yordam",
    "qarz berish",
    "moliya xizmatlari",
    "mikromoliya",
    "investitsiya",
    "biznesni rivojlantirish",
    "tezkor kredit",
    "shaxsiy kredit",
    "korporativ kredit",
    "www.impactfinance.uz",
    "impactfinance.uz"
  ],
  metadataBase: new URL("https://www.impactfinance.uz/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IMPACT FINANCE - Mikrokredit Xizmatlari",
    description:
      "Biznes egalari, yuridik shaxslar va jismoniy shaxslarga mikrokredit va qarz berish xizmatlari. Tezkor va ishonchli moliyaviy yordam.",
    url: "https://www.impactfinance.uz/",
    siteName: "IMPACT FINANCE",
    images: [
      {
        url: "https://www.impactfinance.uz/logo2.png",
        width: 1200,
        height: 630,
        alt: "IMPACT FINANCE - Mikrokredit Xizmatlari",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMPACT FINANCE - Mikrokredit Xizmatlari",
    description:
      "Biznes egalari, yuridik shaxslar va jismoniy shaxslarga mikrokredit va qarz berish xizmatlari. Tezkor va ishonchli moliyaviy yordam.",
    images: ["https://www.impactfinance.uz/logo2.png"],
    site: "@impactfinance",
  },
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD Structured Data for FinancialService & Google Sitelinks
  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "IMPACT FINANCE MFO",
    "alternateName": "IMPACT FINANCE",
    "url": "https://www.impactfinance.uz",
    "logo": "https://www.impactfinance.uz/logo2.png",
    "image": "https://www.impactfinance.uz/home.jpeg",
    "telephone": "+998555150111",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Labzak ko'chasi, 2a-uy, O'rda MFY",
      "addressLocality": "Tashkent",
      "addressRegion": "Shayxontohur tumani",
      "postalCode": "100000",
      "addressCountry": "UZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.3275,
      "longitude": 69.2658
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "15:00"
      }
    ],
    "sameAs": [
      "https://t.me/impactfinance_uz"
    ],
    "license": "O'zbekiston Respublikasi Markaziy Banki Litsenziyasi № 0084"
  };

  // Google Sitelinks Structured Navigation Schema
  const sitelinksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Bosh sahifa",
        "description": "IMPACT FINANCE rasmiy veb-sayti va tezkor kredit xizmatlari",
        "url": "https://www.impactfinance.uz/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Kompaniya haqida",
        "description": "IMPACT FINANCE tarixi, litsenziyalari, ustav va hisobotlari",
        "url": "https://www.impactfinance.uz/about"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Kredit turlari va shartlari",
        "description": "Biznes va jismoniy shaxslar uchun mikrokredit tariflari",
        "url": "https://www.impactfinance.uz/#xizmatlar"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Kredit kalkulyatori",
        "description": "Oylik to'lov va to'lovlar jadvalini onlayn hisoblash",
        "url": "https://www.impactfinance.uz/#kalkulyator"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Kontaktlar va Ariza",
        "description": "Bosh ofis manzili, telefonlar va onlayn ariza topshirish",
        "url": "https://www.impactfinance.uz/#kontaktlar"
      }
    ]
  };

  return (
    <html lang="uz">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
