import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import AboutModel, { ABOUT_DOCUMENT_KEY } from "@/models/About";

/**
 * GET /api/about
 * ──────────────
 * Public — returns the About page content (single document).
 */
export async function GET() {
  try {
    await connectDB();
    const doc = await AboutModel.findOne({ key: ABOUT_DOCUMENT_KEY }).lean();

    if (!doc) {
      return NextResponse.json(
        { error: "About content not found" },
        { status: 404 }
      );
    }

    // Remove key from response (internal use only)
    const obj = doc as unknown as Record<string, unknown>;
    const { key: _k, ...rest } = obj;
    return NextResponse.json(rest);
  } catch (error) {
    console.error("GET /api/about error:", error);
    return NextResponse.json(
      { error: "Failed to fetch about content" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/about
 * ────────────────
 * Protected — update the About page content.
 * Accepts partial update (only send fields you want to change).
 */
export async function PATCH(request: Request) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    const doc = await AboutModel.findOneAndUpdate(
      { key: ABOUT_DOCUMENT_KEY },
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    if (!doc) {
      return NextResponse.json(
        { error: "Failed to update about" },
        { status: 500 }
      );
    }

    const obj = doc as unknown as Record<string, unknown>;
    const { key: _k, ...rest } = obj;
    return NextResponse.json(rest);
  } catch (error) {
    console.error("PATCH /api/about error:", error);
    return NextResponse.json(
      { error: "Failed to update about content" },
      { status: 500 }
    );
  }
}
