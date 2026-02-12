import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import ProjectModel from "@/models/Project";

/**
 * Route params type for Next.js 15 (params is a Promise)
 */
interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/projects/:id
 * ─────────────────────
 * Public — returns a single project by its MongoDB _id or slug.
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    await connectDB();

    // Try to find by slug first (more common for URLs), then by _id
    const project =
      (await ProjectModel.findOne({ slug: id }).lean()) ??
      (await ProjectModel.findById(id).lean());

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("GET /api/projects/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/projects/:id
 * ───────────────────────
 * Protected — update a project's fields.
 * Only sends the fields you want to change (partial update).
 *
 * Why PATCH and not PUT?
 * - PUT replaces the entire document
 * - PATCH updates only the fields you send
 */
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();

    const body = await request.json();

    const project = await ProjectModel.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document (not the old one)
      runValidators: true, // Still validate against schema rules
    }).lean();

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("PATCH /api/projects/:id error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/:id
 * ────────────────────────
 * Protected — permanently removes a project from the database.
 */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await connectDB();

    const project = await ProjectModel.findByIdAndDelete(id).lean();

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
