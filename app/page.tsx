import { HomePage } from "@/components/home-page"
import { getActiveTours } from "@/lib/tour-store"

export const revalidate = 300

export default async function Page() {
  const tours = await getActiveTours()
  return <HomePage tours={tours} />
}
