import { ToursPageContent } from "@/components/tours-page-content"
import { getActiveTours } from "@/lib/tour-store"

export const revalidate = 300

export default async function ToursPage() {
  const tours = await getActiveTours()
  return <ToursPageContent tours={tours} />
}
