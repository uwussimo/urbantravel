import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export const dynamic = "force-dynamic"

const MAX_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 })
  }
  const ext = ALLOWED_TYPES[file.type]
  if (!ext) {
    return NextResponse.json(
      { error: "Поддерживаются только JPG, PNG и WebP" },
      { status: 400 }
    )
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Файл больше 8 МБ" },
      { status: 400 }
    )
  }

  const base = (file.name.replace(/\.[^.]+$/, "") || "photo")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
  const filename = `${Date.now()}-${base || "photo"}${ext}`

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`tours/uploads/${filename}`, file, {
      access: "public",
    })
    return NextResponse.json({ url: blob.url })
  }

  // Local development fallback: save into public/uploads (gitignored)
  const dir = path.join(process.cwd(), "public", "uploads")
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(
    path.join(dir, filename),
    Buffer.from(await file.arrayBuffer())
  )
  return NextResponse.json({ url: `/uploads/${filename}` })
}
