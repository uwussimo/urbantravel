"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { TourCard } from "@/components/tour-card"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import type { Tour } from "@/lib/tours"
import {
  Users,
  Briefcase,
  Globe,
  Languages,
  Ticket,
  TrendingUp,
} from "lucide-react"

const galleryImages = [
  { src: "/gallery/photo_2026-03-11 00.02.08.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.12.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.14.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.15.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.16.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.18.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.19.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.21.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.27.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.28.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.32.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.37.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.42.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.44.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.02.47.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.00.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.01.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.04.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.06.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.09.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.17.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.19.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.27.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.33.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.36.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.42.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.47.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.53.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.57.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.03.58.jpeg" },
  { src: "/gallery/photo_2026-03-11 00.04.03.jpeg" },
]

const serviceIcons = [
  { icon: Users, keyRu: "Групповые туры", keyUz: "Guruhli turlar" },
  { icon: Briefcase, keyRu: "Бизнес поездки", keyUz: "Biznes safarlar" },
  { icon: Globe, keyRu: "Выставки", keyUz: "Ko'rgazmalar" },
  { icon: Languages, keyRu: "Переводчики", keyUz: "Tarjimonlar" },
  { icon: Ticket, keyRu: "Авиа / ж/д билеты", keyUz: "Avia / temir yo'l" },
  { icon: TrendingUp, keyRu: "B2B поездки", keyUz: "B2B safarlar" },
]

export function HomePage({ tours }: { tours: Tour[] }) {
  const { lang } = useLanguage()
  const t = translations[lang]

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const galleryAlt = (i: number) =>
    lang === "ru"
      ? `Туристы Urban Travel в Китае — фото ${i + 1}`
      : `Urban Travel sayyohlari Xitoyda — ${i + 1}-surat`

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : 0
    )
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : 0))

  return (
    <main className="flex-1">
      {/* ── Hero ── */}
      <section className="relative flex min-h-[88vh] items-center justify-center">
        <Image
          src="/hero/joshua-sortino-gii7lF4y0WY-unsplash.jpg"
          alt={lang === "ru" ? "Пейзаж Китая" : "Xitoy manzarasi"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
          <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            🇨🇳 Urban Travel · Ташкент
          </div>
          <h1 className="mb-5 text-4xl leading-tight font-bold sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mb-8 text-lg text-white/80 sm:text-xl">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-w-45 bg-white font-semibold text-primary hover:bg-white/90"
            >
              <Link href="/tours">{t.hero.ctaTours}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-45 border-white/60 text-white hover:bg-white/10"
            >
              <Link href="/contact">{t.hero.ctaContact}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── About strip ── */}
      <section className="py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
            {t.about.title}
          </h2>
          {t.about.text.split("\n").map((line, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {line}
            </p>
          ))}
          <p className="mt-4 font-semibold">{t.about.stats}</p>

          {/* Services icons row */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {serviceIcons.map(({ icon: Icon, keyRu, keyUz }) => (
              <div key={keyRu} className="flex flex-col items-center gap-1.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-center text-xs leading-tight text-muted-foreground">
                  {lang === "ru" ? keyRu : keyUz}
                </span>
              </div>
            ))}
          </div>

          <Button asChild variant="outline" className="mt-8">
            <Link href="/about">{t.about.readMore}</Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* ── Tours ── */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">{t.tours.title}</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/tours">{t.tours.viewAll}</Link>
            </Button>
          </div>
          {tours.length === 0 ? (
            <p className="text-muted-foreground">{t.tours.noTours}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
              {t.gallery.title}
            </h2>
            <p className="text-muted-foreground">{t.gallery.subtitle}</p>
          </div>

          {/* Marquee rows */}
          <style>{`
            @keyframes marquee-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
            @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
            .marquee-left  { animation: marquee-left  140s linear infinite; }
            .marquee-right { animation: marquee-right 140s linear infinite; }
            .marquee-left:hover, .marquee-right:hover { animation-play-state: paused; }
          `}</style>

          <div className="space-y-3 overflow-hidden">
            {[
              { className: "marquee-left" },
              { className: "marquee-right" },
            ].map(({ className }) => (
              <div key={className} className="flex gap-3">
                <div className={`${className} flex shrink-0 gap-3`}>
                  {[...galleryImages, ...galleryImages].map((img, i) => (
                    <button
                      key={i}
                      onClick={() => openLightbox(i % galleryImages.length)}
                      className="group relative h-52 w-80 shrink-0 overflow-hidden rounded-2xl bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Image
                        src={img.src}
                        alt={galleryAlt(i % galleryImages.length)}
                        fill
                        sizes="320px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryAlt(lightboxIndex)}
            className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {lightboxIndex + 1} / {galleryImages.length}
          </span>
        </div>
      )}

      <Separator />

      {/* ── Help in China services ── */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            {t.services.title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.services.text}
          </p>
          <Button asChild className="mt-6">
            <Link href="/contact">{t.hero.ctaContact}</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
