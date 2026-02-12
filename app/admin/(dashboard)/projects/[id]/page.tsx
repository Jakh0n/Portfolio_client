import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { ProjectForm } from "@/components/admin/ProjectForm";

/**
 * Edit Project Page
 * ─────────────────
 * Loads the project from the database and passes it to ProjectForm.
 * Server Component — data is fetched on the server before rendering.
 */

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  await connectDB();

  const project = await ProjectModel.findById(id).lean();

  if (!project) {
    notFound();
  }

  // Serialize for client component
  const initialData = {
    title: project.title,
    slug: project.slug,
    category: project.category,
    description: project.description,
    tags: project.tags.join(", "),
    image: project.image,
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    featured: project.featured,
    order: project.order,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-sm text-muted-foreground">
          Editing &ldquo;{project.title}&rdquo;
        </p>
      </div>

      <ProjectForm
        mode="edit"
        projectId={project._id.toString()}
        initialData={initialData}
      />
    </div>
  );
}
