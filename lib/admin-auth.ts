// Cookie-session auth for the admin panel. Uses Web Crypto only, so the same
// code runs in middleware (edge) and route handlers (node).

export const ADMIN_COOKIE = "ut_admin"

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  )
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getSecret()
  if (!secret) return null
  const expires = Date.now() + SESSION_TTL_MS
  return `${expires}.${await hmac(secret, String(expires))}`
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  const secret = getSecret()
  if (!secret || !token) return false
  const [expiresRaw, signature] = token.split(".")
  if (!expiresRaw || !signature) return false
  const expires = Number(expiresRaw)
  if (!Number.isFinite(expires) || expires < Date.now()) return false
  return timingSafeEqual(await hmac(secret, expiresRaw), signature)
}

export async function verifyPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  // Hash both sides so comparison time doesn't depend on password length
  const secret = expected
  return timingSafeEqual(
    await hmac(secret, password),
    await hmac(secret, expected)
  )
}
