"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ExternalLink, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === "/admin/login") return null

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        <Link href="/admin" className="flex items-baseline gap-2.5">
          <span className="text-base font-bold tracking-tight uppercase">
            Urban Travel
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Админ-панель
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/" target="_blank">
              На сайт
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            Выйти
          </Button>
        </div>
      </div>
    </header>
  )
}
