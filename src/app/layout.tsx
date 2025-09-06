import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./Providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "IMPACT FINANCE - Mikrokredit Xizmatlari",
  description:
    "Biznes egalari, yuridik shaxslar va jismoniy shaxslarga mikrokredit va qarz berish xizmatlari. Tezkor va ishonchli moliyaviy yordam.",
  keywords: [
    "mikrokredit",
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
  openGraph: {
    title: "IMPACT FINANCE - Mikrokredit Xizmatlari",
    description:
      "Biznes egalari, yuridik shaxslar va jismoniy shaxslarga mikrokredit va qarz berish xizmatlari. Tezkor va ishonchli moliyaviy yordam.",
    url: "https://www.impactfinance.uz/",
    siteName: "IMPACT FINANCE",
    images: [
      {
        url: "https://www.impactfinance.uz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo2.202c46ad.png&w=256&q=75",
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
    images: ["https://www.impactfinance.uz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo2.202c46ad.png&w=256&q=75"],
    site: "@impactfinance", // agar Twitter akkauntingiz bo'lsa
  },
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/apple-touch-icon.png",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
