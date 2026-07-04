import { promises as fs } from "fs"
import path from "path"
import { getStore } from "@netlify/blobs"
import { list, put } from "@vercel/blob"

import { seedTours, type Tour, type TourStatus } from "@/lib/tours"

// Tours live in a single JSON document. Backend is picked automatically:
// Netlify Blobs on Netlify, Vercel Blob when BLOB_READ_WRITE_TOKEN is set,
// otherwise a gitignored local file. First read seeds from lib/tours.ts.

const BLOB_PATH = "data/tours.json"
const LOCAL_PATH = path.join(process.cwd(), ".data", "tours.json")

export const onNetlify = () =>
  Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT)
const hasVercelBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

const netlifyStore = () => getStore({ name: "tours", consistency: "strong" })

async function readAll(): Promise<Tour[]> {
  try {
    if (onNetlify()) {
      const data = await netlifyStore().get(BLOB_PATH, { type: "json" })
      return (data as Tour[] | null) ?? seedTours
    }
    if (hasVercelBlob()) {
      const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 })
      if (blobs.length === 0) return seedTours
      const res = await fetch(blobs[0].url, { cache: "no-store" })
      if (!res.ok) throw new Error(`Blob fetch failed: ${res.status}`)
      return (await res.json()) as Tour[]
    }
    const raw = await fs.readFile(LOCAL_PATH, "utf8")
    return JSON.parse(raw) as Tour[]
  } catch {
    return seedTours
  }
}

async function writeAll(tours: Tour[]): Promise<void> {
  const json = JSON.stringify(tours, null, 2)
  if (onNetlify()) {
    await netlifyStore().setJSON(BLOB_PATH, tours)
  } else if (hasVercelBlob()) {
    await put(BLOB_PATH, json, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    })
  } else {
    await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true })
    await fs.writeFile(LOCAL_PATH, json, "utf8")
  }
}

export async function getAllTours(): Promise<Tour[]> {
  return readAll()
}

export async function getActiveTours(): Promise<Tour[]> {
  return (await readAll()).filter((t) => t.status === "active")
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  return (await readAll()).find((t) => t.slug === slug)
}

export async function getTourById(id: string): Promise<Tour | undefined> {
  return (await readAll()).find((t) => t.id === id)
}

export async function createTour(tour: Omit<Tour, "id" | "updatedAt">): Promise<Tour> {
  const tours = await readAll()
  if (tours.some((t) => t.slug === tour.slug)) {
    throw new SlugTakenError(tour.slug)
  }
  const created: Tour = {
    ...tour,
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
  }
  await writeAll([created, ...tours])
  return created
}

export async function updateTour(
  id: string,
  patch: Omit<Tour, "id" | "updatedAt">
): Promise<Tour> {
  const tours = await readAll()
  const index = tours.findIndex((t) => t.id === id)
  if (index === -1) throw new TourNotFoundError(id)
  if (tours.some((t) => t.slug === patch.slug && t.id !== id)) {
    throw new SlugTakenError(patch.slug)
  }
  const updated: Tour = { ...patch, id, updatedAt: new Date().toISOString() }
  tours[index] = updated
  await writeAll(tours)
  return updated
}

export async function setTourStatus(id: string, status: TourStatus): Promise<Tour> {
  const tours = await readAll()
  const index = tours.findIndex((t) => t.id === id)
  if (index === -1) throw new TourNotFoundError(id)
  tours[index] = { ...tours[index], status, updatedAt: new Date().toISOString() }
  await writeAll(tours)
  return tours[index]
}

export async function deleteTour(id: string): Promise<void> {
  const tours = await readAll()
  const remaining = tours.filter((t) => t.id !== id)
  if (remaining.length === tours.length) throw new TourNotFoundError(id)
  await writeAll(remaining)
}

export class TourNotFoundError extends Error {
  constructor(id: string) {
    super(`Tour not found: ${id}`)
    this.name = "TourNotFoundError"
  }
}

export class SlugTakenError extends Error {
  constructor(slug: string) {
    super(`Slug already in use: ${slug}`)
    this.name = "SlugTakenError"
  }
}
