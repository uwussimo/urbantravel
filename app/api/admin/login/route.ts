import { NextResponse } from "next/server"

import {
  ADMIN_COOKIE,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  let password = ""
  try {
    const body = await request.json()
    password = typeof body?.password === "string" ? body.password : ""
  } catch {
    // fall through with empty password
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server" },
      { status: 500 }
    )
  }

  if (!password || !(await verifyPassword(password))) {
    // Slow down brute-force attempts
    await new Promise((r) => setTimeout(r, 500))
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
  }

  const token = await createSessionToken()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })
  return response
}
