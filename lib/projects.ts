import { connectDB } from "@/lib/mongodb";
import ProjectModel, { type IProject } from "@/models/Project";
import type { WorkProject } from "@/constants/work";

/**
 * Server-side project fetchers
 * ────────────────────────────
 * These run ONLY on the server (in Server Components / API routes).
 * They talk directly to MongoDB — no API call needed.
 *
 * Why not call our own API?
 * Server Components can access the database directly.
 * Calling your own API from the server is an unnecessary round trip.
 */

/** Serialize a Mongoose lean document to a plain object for the client */
function serialize(doc: IProject & { _id: unknown }): WorkProject {
  return {
    _id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    category: doc.category as WorkProject["category"],
    description: doc.description,
    tags: [...doc.tags],
    image: doc.image,
    liveUrl: doc.liveUrl ?? "",
    githubUrl: doc.githubUrl ?? "",
    featured: doc.featured,
    order: doc.order,
  };
}

/** Get all projects, sorted by order */
export async function getAllProjects(): Promise<WorkProject[]> {
  await connectDB();
  const docs = await ProjectModel.find().sort({ order: 1 }).lean();
  return docs.map(serialize);
}

/** Get only featured projects (for home page) */
export async function getFeaturedProjects(): Promise<WorkProject[]> {
  await connectDB();
  const docs = await ProjectModel.find({ featured: true })
    .sort({ order: 1 })
    .lean();
  return docs.map(serialize);
}

/** Get a single project by slug */
export async function getProjectBySlug(
  slug: string,
): Promise<WorkProject | null> {
  await connectDB();
  const doc = await ProjectModel.findOne({ slug }).lean();
  if (!doc) return null;
  return serialize(doc);
}
