import { NextResponse, type NextRequest } from "next/server"

import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth"

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isLoginPage = pathname === "/admin/login"
  const isLoginApi = pathname === "/api/admin/login"
  if (isLoginApi) return NextResponse.next()

  const token = request.cookies.get(ADMIN_COOKIE)?.value
  const authed = await verifySessionToken(token)

  if (isLoginPage) {
    if (authed) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
    return NextResponse.next()
  }

  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*"],
}
