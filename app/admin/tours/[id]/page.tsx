import { notFound } from "next/navigation"

import { TourEditor } from "@/components/admin/tour-editor"
import { getTourById } from "@/lib/tour-store"

export const dynamic = "force-dynamic"

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tour = await getTourById(id)
  if (!tour) notFound()

  return <TourEditor tour={tour} />
}
