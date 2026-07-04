"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { tourInputSchema, type TourInput } from "@/lib/tour-schema"
import type { Tour } from "@/lib/tours"

interface FormState {
  status: "active" | "archived"
  slug: string
  titleRu: string
  titleUz: string
  routeRu: string
  routeUz: string
  datesRu: string
  datesUz: string
  durationDays: string
  durationNights: string
  priceFrom: string
  priceIsFrom: boolean
  priceNoteRu: string
  priceNoteUz: string
  departuresRu: string
  departuresUz: string
  highlightsRu: string
  highlightsUz: string
  includedRu: string
  includedUz: string
  notIncludedRu: string
  notIncludedUz: string
  contentRu: string
  contentUz: string
  photos: string[]
}

const lines = (value: string) =>
  value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)

const joined = (value: string[] | undefined) => (value ?? []).join("\n")

function toFormState(tour?: Tour): FormState {
  return {
    status: tour?.status ?? "active",
    slug: tour?.slug ?? "",
    titleRu: tour?.title.ru ?? "",
    titleUz: tour?.title.uz ?? "",
    routeRu: tour?.route.ru ?? "",
    routeUz: tour?.route.uz ?? "",
    datesRu: tour?.dates.ru ?? "",
    datesUz: tour?.dates.uz ?? "",
    durationDays: tour?.durationDays ? String(tour.durationDays) : "",
    durationNights: tour?.durationNights ? String(tour.durationNights) : "",
    priceFrom: tour?.priceFrom ? String(tour.priceFrom) : "",
    priceIsFrom: tour?.priceIsFrom ?? true,
    priceNoteRu: tour?.priceNote?.ru ?? "",
    priceNoteUz: tour?.priceNote?.uz ?? "",
    departuresRu: joined(tour?.departures?.ru),
    departuresUz: joined(tour?.departures?.uz),
    highlightsRu: joined(tour?.highlights.ru),
    highlightsUz: joined(tour?.highlights.uz),
    includedRu: joined(tour?.included?.ru),
    includedUz: joined(tour?.included?.uz),
    notIncludedRu: joined(tour?.notIncluded?.ru),
    notIncludedUz: joined(tour?.notIncluded?.uz),
    contentRu: tour?.content.ru ?? "",
    contentUz: tour?.content.uz ?? "",
    photos: tour?.photos ?? [],
  }
}

const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
  я: "ya",
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .split("")
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("")
    .replace(/['’‘`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

function toTourInput(form: FormState): TourInput {
  const optionalL10n = (ru: string, uz: string) =>
    ru.trim() || uz.trim() ? { ru: ru.trim(), uz: uz.trim() } : undefined
  const optionalL10nList = (ru: string, uz: string) => {
    const ruList = lines(ru)
    const uzList = lines(uz)
    return ruList.length || uzList.length
      ? { ru: ruList, uz: uzList }
      : undefined
  }

  return {
    status: form.status,
    slug: form.slug.trim(),
    title: { ru: form.titleRu.trim(), uz: form.titleUz.trim() },
    route: { ru: form.routeRu.trim(), uz: form.routeUz.trim() },
    dates: { ru: form.datesRu.trim(), uz: form.datesUz.trim() },
    durationDays: form.durationDays ? Number(form.durationDays) : undefined,
    durationNights: form.durationNights
      ? Number(form.durationNights)
      : undefined,
    priceFrom: form.priceFrom ? Number(form.priceFrom) : undefined,
    priceIsFrom: form.priceIsFrom,
    priceNote: optionalL10n(form.priceNoteRu, form.priceNoteUz),
    departures: optionalL10nList(form.departuresRu, form.departuresUz),
    photos: form.photos,
    highlights: {
      ru: lines(form.highlightsRu),
      uz: lines(form.highlightsUz),
    },
    included: optionalL10nList(form.includedRu, form.includedUz),
    notIncluded: optionalL10nList(form.notIncludedRu, form.notIncludedUz),
    content: { ru: form.contentRu.trim(), uz: form.contentUz.trim() },
  }
}

function BilingualField({
  label,
  ru,
  uz,
  onRu,
  onUz,
  textarea,
  rows,
  hint,
}: {
  label: string
  ru: string
  uz: string
  onRu: (v: string) => void
  onUz: (v: string) => void
  textarea?: boolean
  rows?: number
  hint?: string
}) {
  const Control = textarea ? Textarea : Input
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground">RU</span>
          <Control
            value={ru}
            rows={rows}
            onChange={(e) => onRu(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground">UZ</span>
          <Control
            value={uz}
            rows={rows}
            onChange={(e) => onUz(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export function TourEditor({ tour }: { tour?: Tour }) {
  const router = useRouter()
  const isNew = !tour
  const [form, setForm] = useState<FormState>(() => toFormState(tour))
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [photoUrl, setPhotoUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const onTitleRu = (value: string) => {
    setForm((f) => ({
      ...f,
      titleRu: value,
      slug: !slugTouched && isNew ? slugify(value) : f.slug,
    }))
  }

  const movePhoto = (index: number, dir: -1 | 1) => {
    setForm((f) => {
      const photos = [...f.photos]
      const target = index + dir
      if (target < 0 || target >= photos.length) return f
      ;[photos[index], photos[target]] = [photos[target], photos[index]]
      return { ...f, photos }
    })
  }

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const body = new FormData()
        body.append("file", file)
        const res = await fetch("/api/admin/upload", { method: "POST", body })
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          toast.error(data?.error ?? `Не удалось загрузить ${file.name}`)
          continue
        }
        setForm((f) => ({ ...f, photos: [...f.photos, data.url] }))
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = tourInputSchema.safeParse(toTourInput(form))
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      toast.error(`Проверьте поля: ${first.path.join(".")} — ${first.message}`)
      return
    }
    setSaving(true)
    try {
      const res = await fetch(
        isNew ? "/api/admin/tours" : `/api/admin/tours/${tour!.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        }
      )
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        toast.error(data?.error ?? "Не удалось сохранить тур")
        return
      }
      toast.success(isNew ? "Тур создан" : "Тур сохранён")
      router.push("/admin")
      router.refresh()
    } catch {
      toast.error("Ошибка сети, попробуйте ещё раз")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isNew ? "Новый тур" : `Редактирование: ${tour!.title.ru}`}
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              id="tour-active"
              checked={form.status === "active"}
              onCheckedChange={(checked) =>
                set("status", checked ? "active" : "archived")
              }
            />
            <Label htmlFor="tour-active" className="text-sm">
              {form.status === "active" ? "Активен" : "В архиве"}
            </Label>
          </div>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            Сохранить
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Основное</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <BilingualField
            label="Название"
            ru={form.titleRu}
            uz={form.titleUz}
            onRu={onTitleRu}
            onUz={(v) => set("titleUz", v)}
          />
          <div className="space-y-1.5">
            <Label htmlFor="tour-slug">Ссылка (slug)</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/tours/</span>
              <Input
                id="tour-slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  set("slug", e.target.value)
                }}
              />
            </div>
          </div>
          <BilingualField
            label="Маршрут"
            ru={form.routeRu}
            uz={form.routeUz}
            onRu={(v) => set("routeRu", v)}
            onUz={(v) => set("routeUz", v)}
          />
          <BilingualField
            label="Даты (краткая строка)"
            ru={form.datesRu}
            uz={form.datesUz}
            onRu={(v) => set("datesRu", v)}
            onUz={(v) => set("datesUz", v)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Цена и длительность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="tour-price">Цена, $</Label>
              <Input
                id="tour-price"
                type="number"
                min="0"
                value={form.priceFrom}
                onChange={(e) => set("priceFrom", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tour-days">Дней</Label>
              <Input
                id="tour-days"
                type="number"
                min="0"
                value={form.durationDays}
                onChange={(e) => set("durationDays", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tour-nights">Ночей</Label>
              <Input
                id="tour-nights"
                type="number"
                min="0"
                value={form.durationNights}
                onChange={(e) => set("durationNights", e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="tour-price-from"
              checked={form.priceIsFrom}
              onCheckedChange={(v) => set("priceIsFrom", v)}
            />
            <Label htmlFor="tour-price-from" className="text-sm">
              Показывать «от» перед ценой
            </Label>
          </div>
          <BilingualField
            label="Примечание к цене"
            hint="Например: «без авиаперелёта»"
            ru={form.priceNoteRu}
            uz={form.priceNoteUz}
            onRu={(v) => set("priceNoteRu", v)}
            onUz={(v) => set("priceNoteUz", v)}
          />
          <BilingualField
            label="Заезды"
            hint="Каждый заезд с новой строки, например: «11–19 мая»"
            textarea
            rows={4}
            ru={form.departuresRu}
            uz={form.departuresUz}
            onRu={(v) => set("departuresRu", v)}
            onUz={(v) => set("departuresUz", v)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Фотографии</CardTitle>
          <CardDescription>
            Первая фотография используется как обложка тура
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.photos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {form.photos.map((photo, i) => (
                <div
                  key={`${photo}-${i}`}
                  className="group relative aspect-4/3 overflow-hidden rounded-lg border bg-muted"
                >
                  <Image
                    src={photo}
                    alt={`Фото ${i + 1}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute top-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      Обложка
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="h-7 w-7"
                      aria-label="Сдвинуть влево"
                      onClick={() => movePhoto(i, -1)}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="h-7 w-7"
                      aria-label="Сдвинуть вправо"
                      onClick={() => movePhoto(i, 1)}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="h-7 w-7"
                      aria-label="Удалить фото"
                      onClick={() =>
                        set(
                          "photos",
                          form.photos.filter((_, idx) => idx !== i)
                        )
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => uploadFiles(e.target.files)}
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="mr-1.5 h-4 w-4" />
              )}
              Загрузить фото
            </Button>
            <div className="flex flex-1 gap-2">
              <Input
                placeholder="или вставьте URL изображения"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                disabled={!photoUrl.trim()}
                onClick={() => {
                  set("photos", [...form.photos, photoUrl.trim()])
                  setPhotoUrl("")
                }}
              >
                Добавить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Программа и условия</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <BilingualField
            label="Программа тура (highlights)"
            hint="Каждый пункт с новой строки"
            textarea
            rows={7}
            ru={form.highlightsRu}
            uz={form.highlightsUz}
            onRu={(v) => set("highlightsRu", v)}
            onUz={(v) => set("highlightsUz", v)}
          />
          <BilingualField
            label="В стоимость входит"
            hint="Каждый пункт с новой строки"
            textarea
            rows={5}
            ru={form.includedRu}
            uz={form.includedUz}
            onRu={(v) => set("includedRu", v)}
            onUz={(v) => set("includedUz", v)}
          />
          <BilingualField
            label="Не входит в стоимость"
            hint="Каждый пункт с новой строки"
            textarea
            rows={3}
            ru={form.notIncludedRu}
            uz={form.notIncludedUz}
            onRu={(v) => set("notIncludedRu", v)}
            onUz={(v) => set("notIncludedUz", v)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Описание</CardTitle>
          <CardDescription>
            Абзацы разделяются пустой строкой
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BilingualField
            label="Полное описание"
            textarea
            rows={12}
            ru={form.contentRu}
            uz={form.contentUz}
            onRu={(v) => set("contentRu", v)}
            onUz={(v) => set("contentUz", v)}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
          Сохранить
        </Button>
      </div>
    </form>
  )
}
