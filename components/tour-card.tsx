"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, CalendarDays, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { formatDuration, formatPrice, type Tour } from "@/lib/tours"

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  const { lang } = useLanguage()
  const t = translations[lang]

  const price = formatPrice(tour, lang)
  const duration = formatDuration(tour, lang)

  return (
    <div className="flex h-full flex-col rounded-3xl bg-card p-3 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
      {/* Photo */}
      <Link
        href={`/tours/${tour.slug}`}
        className="relative block aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl bg-muted"
      >
        {tour.photos[0] && (
          <Image
            src={tour.photos[0]}
            alt={tour.title[lang]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col pt-4">
        {/* Title + flag */}
        <div className="flex items-center gap-2">
          <h3 className="flex-1 truncate text-base leading-tight font-bold">
            {tour.title[lang]}
          </h3>
          <span className="text-base">🇨🇳</span>
        </div>

        {/* Route */}
        <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-2">{tour.route[lang]}</span>
        </p>

        {/* Divider pinned above stats so buttons align across cards */}
        <div className="mt-auto pt-3">
          <div className="mb-3 h-px bg-border" />

          {/* Stats rows */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {tour.dates[lang] && (
                <div className="flex items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                  <span>{tour.dates[lang]}</span>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{duration}</span>
                </div>
              )}
            </div>
            <div className="flex h-5 items-center gap-1 text-sm font-semibold text-primary">
              {price && (
                <>
                  <Tag className="h-3.5 w-3.5 shrink-0" />
                  <span>{price}</span>
                </>
              )}
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="mt-4 w-full rounded-full px-4"
          >
            <Link href={`/tours/${tour.slug}`}>{t.tours.details}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
