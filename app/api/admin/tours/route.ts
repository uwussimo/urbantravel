import { NextResponse } from "next/server"

import { revalidatePublicPages } from "@/lib/revalidate"
import { tourInputSchema } from "@/lib/tour-schema"
import { createTour, getAllTours, SlugTakenError } from "@/lib/tour-store"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json(await getAllTours())
}

export async function POST(request: Request) {
  const parsed = tourInputSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    )
  }
  try {
    const tour = await createTour(parsed.data)
    revalidatePublicPages()
    return NextResponse.json(tour, { status: 201 })
  } catch (err) {
    if (err instanceof SlugTakenError) {
      return NextResponse.json({ error: err.message }, { status: 409 })
    }
    throw err
  }
}
