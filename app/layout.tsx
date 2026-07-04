import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { Analytics } from "@/components/analytics"
import { AppShell } from "@/components/app-shell"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const SITE_URL = "https://urban-travel.uz"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Urban Travel",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Makhtumkuli ko'chasi, 79, City Plaza, 8-qavat, 820-ofis",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+998903930591",
      contactType: "customer service",
    },
    {
      "@type": "ContactPoint",
      telephone: "+998936260888",
      contactType: "customer service",
    },
  ],
  email: "urbantravelchina2025@gmail.com",
  sameAs: [
    "https://t.me/urbantravel_uz",
    "https://www.instagram.com/urban.travel.uz/",
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Urban Travel - Xitoyga biznes va sayohat turlari",
    template: "%s | Urban Travel",
  },
  description:
    "Urban Travel - Xitoyga biznes safarlari, IT va AI turlari, ko'rgazmalar, B2B uchrashuvlar, tarjimonlik xizmatlari va biznes delegatsiyalar. Бизнес поездки в Китай, IT и AI туры, выставки, B2B встречи.",
  keywords: [
    "urban travel",
    "urban travel tashkent",
    "urban travel china",
    "urban travel uz",
    "china business tour",
    "xitoy biznes safari",
    "бизнес тур в китай",
    "IT tour china",
    "AI tour china",
    "urban travel tashkent",
    "china exhibitions tour",
    "b2b china trips",
    "xitoyga sayohat",
    "туры в китай",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Urban Travel - Xitoyga sayohat va biznes turlari",
    description:
      "Urban Travel bilan Xitoyga sayohat qiling. Guruhli turlar, biznes safarlari, ko‘rgazmalar va B2B uchrashuvlar.",
    url: SITE_URL,
    siteName: "Urban Travel",
    images: [
      {
        url: "/assets/og.jpg",
        width: 1200,
        height: 630,
        alt: "Urban Travel - Xitoyga biznes safarlari",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Travel - Xitoyga sayohat va biznes turlari",
    description:
      "Urban Travel - Xitoyga sayohat va biznes turlari, IT va AI turlari, ko'rgazmalar, B2B uchrashuvlar, tarjimonlik xizmatlari va biznes delegatsiyalar.",
    images: ["/assets/og.jpg"],
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="uz"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <AppShell>{children}</AppShell>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
