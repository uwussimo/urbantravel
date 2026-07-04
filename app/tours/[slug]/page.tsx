import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { TourDetail } from "@/components/tour-detail"
import { getTourBySlug } from "@/lib/tour-store"

export const revalidate = 300

const SITE_URL = "https://urban-travel.uz"

interface Props {
  params: Promise<{ slug: string }>
}

const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTourBySlug(slug)

  if (!tour) {
    return {
      title: "Tur topilmadi",
      description: "So'ralgan tur mavjud emas.",
    }
  }

  const descriptionUz = tour.highlights.uz.slice(0, 3).join(". ")
  const descriptionRu = tour.highlights.ru.slice(0, 3).join(". ")
  const coverImage = tour.photos[0]
    ? absoluteUrl(tour.photos[0])
    : `${SITE_URL}/assets/logo.png`

  return {
    title: `${tour.title.uz} | ${tour.title.ru}`,
    description: `${descriptionUz} ${descriptionRu}`,
    alternates: {
      canonical: `/tours/${slug}`,
    },
    robots: tour.status === "archived" ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${tour.title.uz} | Urban Travel`,
      description: descriptionUz,
      url: `${SITE_URL}/tours/${slug}`,
      type: "website",
      images: [{ url: coverImage, width: 1200, height: 630, alt: tour.title.uz }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title.uz} | Urban Travel`,
      description: descriptionUz,
      images: [coverImage],
    },
  }
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params
  const tour = await getTourBySlug(slug)
  if (!tour) notFound()

  const tourUrl = `${SITE_URL}/tours/${tour.slug}`

  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title.ru,
    description: tour.highlights.ru.join(". "),
    url: tourUrl,
    image: tour.photos.map(absoluteUrl),
    touristType: "Группа из Узбекистана",
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.route.ru
        .split("–")
        .map((city, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: city.trim(),
        }))
        .filter((item) => item.name),
    },
    provider: {
      "@type": "TravelAgency",
      name: "Urban Travel",
      url: SITE_URL,
      telephone: "+998903930591",
    },
    ...(tour.priceFrom && tour.status === "active"
      ? {
          offers: {
            "@type": "Offer",
            price: tour.priceFrom,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: tourUrl,
          },
        }
      : {}),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Туры", item: `${SITE_URL}/tours` },
      { "@type": "ListItem", position: 3, name: tour.title.ru, item: tourUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TourDetail tour={tour} />
    </>
  )
}
