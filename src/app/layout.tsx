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
  ],
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
