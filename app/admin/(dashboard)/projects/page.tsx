import Link from "next/link";
import { Plus } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { Button } from "@/components/ui/button";
import { ProjectList } from "@/components/admin/ProjectList";

/**
 * Admin Projects Page
 * ───────────────────
 * Lists all projects with edit/delete actions.
 * Server Component — fetches data on the server.
 */
export default async function AdminProjectsPage() {
  await connectDB();

  const projects = await ProjectModel.find().sort({ order: 1 }).lean();

  // Convert MongoDB documents to plain objects (for client components)
  const serialized = projects.map((p) => ({
    _id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    category: p.category,
    image: p.image,
    featured: p.featured,
    order: p.order,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {serialized.length} project{serialized.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <ProjectList projects={serialized} />
    </div>
  );
}
