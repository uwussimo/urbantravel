"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArchiveRestore,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Send,
  Tag,
  XCircle,
} from "lucide-react"

import { BookingForm } from "@/components/booking-form"
import { useLanguage } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDuration, formatPrice, type Tour } from "@/lib/tours"

const TELEGRAM_URL = "https://t.me/Urbantravel_uz1"

export function TourDetail({ tour }: { tour: Tour }) {
  const { lang } = useLanguage()

  const price = formatPrice(tour, lang)
  const duration = formatDuration(tour, lang)
  const isArchived = tour.status === "archived"
  const [cover, ...restPhotos] = tour.photos

  const L = (ru: string, uz: string) => (lang === "ru" ? ru : uz)

  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[52vh] items-end">
        {cover ? (
          <Image
            src={cover}
            alt={tour.title[lang]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative z-10 container mx-auto px-4 pt-40 pb-10 text-white sm:px-6">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="border-0 bg-white/15 text-white backdrop-blur-sm">
              🇨🇳 {L("Китай", "Xitoy")}
            </Badge>
            <Badge className="flex items-center gap-1 border-0 bg-white/15 text-white backdrop-blur-sm">
              <MapPin className="h-3 w-3" />
              {tour.route[lang]}
            </Badge>
            {tour.dates[lang] && (
              <Badge className="flex items-center gap-1 border-0 bg-white/15 text-white backdrop-blur-sm">
                <CalendarDays className="h-3 w-3" />
                {tour.dates[lang]}
              </Badge>
            )}
            {duration && (
              <Badge className="flex items-center gap-1 border-0 bg-white/15 text-white backdrop-blur-sm">
                <Clock className="h-3 w-3" />
                {duration}
              </Badge>
            )}
          </div>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            {tour.title[lang]}
          </h1>
          {price && (
            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold sm:text-3xl">{price}</span>
              {tour.priceNote && (
                <span className="text-sm text-white/75">
                  · {tour.priceNote[lang]}
                </span>
              )}
            </p>
          )}
        </div>
      </section>

      {/* ── Archived banner ─────────────────────────────────────── */}
      {isArchived && (
        <div className="border-b bg-amber-50 dark:bg-amber-950/30">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <p className="flex items-center gap-2 text-sm text-amber-900 dark:text-amber-200">
              <ArchiveRestore className="h-4 w-4 shrink-0" />
              {L(
                "Этот тур уже завершился. Посмотрите наши актуальные туры.",
                "Bu tur allaqachon yakunlangan. Joriy turlarimiz bilan tanishing."
              )}
            </p>
            <Button asChild size="sm" variant="outline">
              <Link href="/tours">{L("Актуальные туры", "Joriy turlar")}</Link>
            </Button>
          </div>
        </div>
      )}

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="py-10 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* ── Left column ───────────────────────────────── */}
            <div>
              {/* Departures */}
              {tour.departures && tour.departures[lang].length > 0 && (
                <>
                  <h2 className="mb-3 text-lg font-semibold">
                    {L("Даты заездов", "Jo'nash sanalari")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tour.departures[lang].map((d) => (
                      <Badge
                        key={d}
                        variant="outline"
                        className="px-3 py-1 text-sm font-normal"
                      >
                        <CalendarDays className="mr-1.5 h-3.5 w-3.5 text-primary" />
                        {d}
                      </Badge>
                    ))}
                  </div>
                  <Separator className="my-7" />
                </>
              )}

              {/* Highlights */}
              <h2 className="mb-4 text-lg font-semibold">
                {L("Программа тура", "Tur dasturi")}
              </h2>
              <ul className="space-y-2.5">
                {tour.highlights[lang].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Included / not included */}
              {(tour.included || tour.notIncluded) && (
                <>
                  <Separator className="my-7" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {tour.included && tour.included[lang].length > 0 && (
                      <div className="rounded-2xl border bg-muted/30 p-5">
                        <h3 className="mb-3 text-sm font-semibold">
                          {L("В стоимость входит", "Narxga kiradi")}
                        </h3>
                        <ul className="space-y-2">
                          {tour.included[lang].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tour.notIncluded && tour.notIncluded[lang].length > 0 && (
                      <div className="rounded-2xl border bg-muted/30 p-5">
                        <h3 className="mb-3 text-sm font-semibold">
                          {L("Не входит в стоимость", "Narxga kirmaydi")}
                        </h3>
                        <ul className="space-y-2">
                          {tour.notIncluded[lang].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}

              <Separator className="my-7" />

              {/* Description */}
              <h2 className="mb-4 text-lg font-semibold">
                {L("Описание", "Tavsif")}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                {tour.content[lang].split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Photo gallery */}
              {restPhotos.length > 0 && (
                <>
                  <Separator className="my-7" />
                  <h2 className="mb-4 text-lg font-semibold">
                    {L("Фотографии", "Suratlar")}
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {restPhotos.map((photo, i) => (
                      <div
                        key={`${photo}-${i}`}
                        className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted"
                      >
                        <Image
                          src={photo}
                          alt={`${tour.title[lang]} — ${i + 2}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Separator className="my-7" />

              {/* Contacts */}
              <h2 className="mb-3 text-lg font-semibold">
                {L("Связаться с нами", "Biz bilan bog'lanish")}
              </h2>
              <div className="space-y-2">
                <a
                  href="tel:+998903930591"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  +998 90 393 05 91 - Urban Travel 1
                </a>
                <a
                  href="tel:+998936260888"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  +998 93 626 08 88 - Urban Travel 2
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-primary"
                >
                  <Send className="h-4 w-4" />
                  {L("Написать в Telegram", "Telegramda yozish")}
                </a>
              </div>
            </div>

            {/* ── Right column: Booking card ─────────────────── */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card className="overflow-hidden shadow-md">
                {/* Card header */}
                <div
                  className="px-6 py-5 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.12 0.09 222) 0%, oklch(0.40 0.12 222) 70%, oklch(0.609 0.126 221.723) 100%)",
                  }}
                >
                  <p className="text-sm font-medium opacity-80">
                    {L("Забронировать место", "Joy band qilish")}
                  </p>
                  <p className="mt-0.5 text-xl font-bold">{tour.title[lang]}</p>
                  {price && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm opacity-90">
                      <Tag className="h-3.5 w-3.5" />
                      {price}
                      {tour.priceNote && ` · ${tour.priceNote[lang]}`}
                    </p>
                  )}
                </div>
                <CardContent className="pt-5">
                  {isArchived ? (
                    <div className="space-y-3 py-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        {L(
                          "Набор в этот тур завершён, но мы подберём вам похожий.",
                          "Bu turga yozilish yakunlangan, lekin sizga o'xshashini tanlab beramiz."
                        )}
                      </p>
                      <Button asChild className="w-full">
                        <a
                          href={TELEGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Send className="mr-1.5 h-4 w-4" />
                          {L("Написать в Telegram", "Telegramda yozish")}
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <BookingForm tour={tour.title[lang]} />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
