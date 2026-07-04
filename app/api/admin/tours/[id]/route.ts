import { NextResponse } from "next/server"
import { z } from "zod"

import { revalidatePublicPages } from "@/lib/revalidate"
import { tourInputSchema } from "@/lib/tour-schema"
import {
  deleteTour,
  setTourStatus,
  SlugTakenError,
  TourNotFoundError,
  updateTour,
} from "@/lib/tour-store"

export const dynamic = "force-dynamic"

type Context = { params: Promise<{ id: string }> }

function errorResponse(err: unknown) {
  if (err instanceof TourNotFoundError) {
    return NextResponse.json({ error: err.message }, { status: 404 })
  }
  if (err instanceof SlugTakenError) {
    return NextResponse.json({ error: err.message }, { status: 409 })
  }
  throw err
}

export async function PUT(request: Request, { params }: Context) {
  const { id } = await params
  const parsed = tourInputSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    )
  }
  try {
    const tour = await updateTour(id, parsed.data)
    revalidatePublicPages()
    return NextResponse.json(tour)
  } catch (err) {
    return errorResponse(err)
  }
}

const statusSchema = z.object({ status: z.enum(["active", "archived"]) })

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params
  const parsed = statusSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }
  try {
    const tour = await setTourStatus(id, parsed.data.status)
    revalidatePublicPages()
    return NextResponse.json(tour)
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params
  try {
    await deleteTour(id)
    revalidatePublicPages()
    return NextResponse.json({ ok: true })
  } catch (err) {
    return errorResponse(err)
  }
}
