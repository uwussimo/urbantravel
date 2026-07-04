"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Archive, ArchiveRestore, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatPrice, type Tour } from "@/lib/tours"

export function AdminToursTable({ tours }: { tours: Tour[] }) {
  const router = useRouter()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [tourToDelete, setTourToDelete] = useState<Tour | null>(null)

  const setStatus = async (tour: Tour, status: Tour["status"]) => {
    setPendingId(tour.id)
    try {
      const res = await fetch(`/api/admin/tours/${tour.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      toast.success(
        status === "archived" ? "Тур перенесён в архив" : "Тур снова активен"
      )
      router.refresh()
    } catch {
      toast.error("Не удалось изменить статус")
    } finally {
      setPendingId(null)
    }
  }

  const confirmDelete = async () => {
    if (!tourToDelete) return
    setPendingId(tourToDelete.id)
    try {
      const res = await fetch(`/api/admin/tours/${tourToDelete.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error()
      toast.success("Тур удалён")
      router.refresh()
    } catch {
      toast.error("Не удалось удалить тур")
    } finally {
      setPendingId(null)
      setTourToDelete(null)
    }
  }

  if (tours.length === 0) {
    return (
      <p className="rounded-xl border bg-background p-10 text-center text-muted-foreground">
        Туров пока нет — создайте первый.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Фото</TableHead>
            <TableHead>Название</TableHead>
            <TableHead className="hidden md:table-cell">Даты</TableHead>
            <TableHead className="hidden md:table-cell">Цена</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow
              key={tour.id}
              className={tour.status === "archived" ? "opacity-60" : undefined}
            >
              <TableCell>
                <div className="relative h-10 w-14 overflow-hidden rounded-md bg-muted">
                  {tour.photos[0] && (
                    <Image
                      src={tour.photos[0]}
                      alt={tour.title.ru}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <p className="font-medium">{tour.title.ru}</p>
                <p className="text-xs text-muted-foreground">/{tour.slug}</p>
              </TableCell>
              <TableCell className="hidden text-sm md:table-cell">
                {tour.dates.ru || "—"}
              </TableCell>
              <TableCell className="hidden text-sm md:table-cell">
                {formatPrice(tour, "ru") ?? "—"}
              </TableCell>
              <TableCell>
                {tour.status === "active" ? (
                  <Badge>Активен</Badge>
                ) : (
                  <Badge variant="secondary">Архив</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    aria-label="Редактировать"
                  >
                    <Link href={`/admin/tours/${tour.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={pendingId === tour.id}
                    aria-label={
                      tour.status === "active"
                        ? "В архив"
                        : "Вернуть из архива"
                    }
                    onClick={() =>
                      setStatus(
                        tour,
                        tour.status === "active" ? "archived" : "active"
                      )
                    }
                  >
                    {tour.status === "active" ? (
                      <Archive className="h-4 w-4" />
                    ) : (
                      <ArchiveRestore className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={pendingId === tour.id}
                    aria-label="Удалить"
                    onClick={() => setTourToDelete(tour)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={tourToDelete !== null}
        onOpenChange={(open) => !open && setTourToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить тур?</AlertDialogTitle>
            <AlertDialogDescription>
              «{tourToDelete?.title.ru}» будет удалён безвозвратно. Если тур
              может ещё пригодиться, лучше перенести его в архив.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
