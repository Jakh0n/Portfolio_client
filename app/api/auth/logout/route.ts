import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * ─────────────────────
 * Removes the auth cookie → admin is logged out.
 * Simple — just delete the cookie and redirect to login.
 */
export async function POST() {
  await removeAuthCookie();

  return NextResponse.json({ success: true });
}
