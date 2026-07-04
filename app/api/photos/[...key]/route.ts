import { NextResponse } from "next/server"
import { getStore } from "@netlify/blobs"

import { onNetlify } from "@/lib/tour-store"

// Publicly serves photos uploaded to Netlify Blobs (they have no public URLs
// of their own, unlike Vercel Blob).

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  if (!onNetlify()) {
    return NextResponse.json({ error: "Not available" }, { status: 404 })
  }

  const { key } = await params
  const filename = key.join("/")
  if (filename.includes("..")) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }

  const store = getStore({ name: "photos", consistency: "strong" })
  const entry = await store.getWithMetadata(filename, { type: "arrayBuffer" })
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const contentType =
    typeof entry.metadata?.contentType === "string"
      ? entry.metadata.contentType
      : "image/jpeg"

  return new NextResponse(entry.data, {
    headers: {
      "Content-Type": contentType,
      // Filenames are timestamped and never rewritten, so cache forever
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
