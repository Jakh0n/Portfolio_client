import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import ProjectModel from "@/models/Project";

/**
 * GET /api/projects
 * ─────────────────
 * Public — returns all projects sorted by order.
 * Used by the frontend to display projects.
 *
 * Query params:
 *   ?featured=true → only return featured projects (for home page)
 */
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const filter = featured === "true" ? { featured: true } : {};
    const projects = await ProjectModel.find(filter).sort({ order: 1 }).lean();

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * ──────────────────
 * Protected — only admins can create projects.
 *
 * Accepts: { title, slug, category, description, tags, image, ... }
 * Returns: { project: {...} }
 */
export async function POST(request: Request) {
  try {
    // Check auth — reject if not logged in
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    // Mongoose validates the data against the schema
    // If validation fails, it throws an error with details
    const project = await ProjectModel.create(body);

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);

    // Mongoose validation error — return friendly message
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Duplicate slug
    if (
      error instanceof Error &&
      "code" in error &&
      (error as Record<string, unknown>).code === 11000
    ) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
