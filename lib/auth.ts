import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

/**
 * JWT Authentication helpers
 * ──────────────────────────
 *
 * How JWT auth works (step by step):
 *
 * 1. ADMIN LOGS IN → sends email + password to /api/auth/login
 * 2. SERVER VERIFIES → checks password against database hash
 * 3. SERVER CREATES TOKEN → signs a JWT containing the admin's ID
 * 4. TOKEN STORED IN COOKIE → browser automatically sends it with every request
 * 5. PROTECTED ROUTES → call verifyAuth() to check the cookie
 * 6. IF VALID → admin can access the page. IF NOT → redirect to login.
 *
 * Why cookies instead of localStorage?
 * - Cookies are sent automatically with every request (no extra code)
 * - httpOnly cookies can't be read by JavaScript (safer against XSS attacks)
 * - Works with Server Components (localStorage is client-only)
 */

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env.local");
}

const TOKEN_NAME = "admin_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

/* ── Token payload shape ── */

interface TokenPayload {
  adminId: string;
  email: string;
}

/**
 * Create a signed JWT token.
 * Called after successful login.
 */
export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: TOKEN_MAX_AGE });
}

/**
 * Verify and decode a JWT token.
 * Returns the payload if valid, null if expired/tampered.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET!) as TokenPayload;
  } catch {
    return null; // Token expired or invalid
  }
}

/**
 * Set the auth token as an httpOnly cookie.
 * Called after successful login.
 *
 * httpOnly: true  → JavaScript can't read it (XSS protection)
 * secure: true    → Only sent over HTTPS (production)
 * sameSite: "lax" → Sent with navigation but not cross-site requests
 * path: "/"       → Available on all routes
 */
export async function setAuthCookie(payload: TokenPayload): Promise<void> {
  const token = signToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_MAX_AGE,
  });
}

/**
 * Remove the auth cookie (logout).
 */
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

/**
 * Check if the current request has a valid admin session.
 * Use this in Server Components and Server Actions to protect pages.
 *
 * @returns The token payload if authenticated, null otherwise.
 *
 * @example
 * const admin = await verifyAuth();
 * if (!admin) redirect("/admin/login");
 */
export async function verifyAuth(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) return null;

  return verifyToken(token);
}
