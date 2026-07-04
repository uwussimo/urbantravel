import type { Metadata } from "next"

import { AdminHeader } from "@/components/admin/admin-header"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-1 flex-col bg-muted/20">
      <AdminHeader />
      <div className="container mx-auto flex-1 px-4 py-8 sm:px-6">
        {children}
      </div>
      <Toaster richColors position="top-center" />
    </div>
  )
}
