import Link from "next/link"
import { Plus } from "lucide-react"

import { AdminToursTable } from "@/components/admin/tours-table"
import { Button } from "@/components/ui/button"
import { getAllTours } from "@/lib/tour-store"

export const dynamic = "force-dynamic"

export default async function AdminToursPage() {
  const tours = await getAllTours()

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Туры</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tours.filter((t) => t.status === "active").length} активных ·{" "}
            {tours.filter((t) => t.status === "archived").length} в архиве
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tours/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Новый тур
          </Link>
        </Button>
      </div>
      <AdminToursTable tours={tours} />
    </main>
  )
}
