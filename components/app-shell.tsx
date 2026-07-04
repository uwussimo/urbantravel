"use client"

import { usePathname } from "next/navigation"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome =
    pathname === "/links" ||
    pathname.startsWith("/links/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/")

  return (
    <div className="flex min-h-svh flex-col">
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
    </div>
  )
}
