import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

/**
 * GET /api/auth/me
 * ────────────────
 * Returns the currently logged-in admin's info.
 * Used by the admin panel to check if the session is still valid.
 */
export async function GET() {
  const admin = await verifyAuth();

  if (!admin) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ admin });
}
