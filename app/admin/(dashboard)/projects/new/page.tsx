import { ProjectForm } from "@/components/admin/ProjectForm";

/**
 * Create New Project Page
 * ───────────────────────
 * Simple wrapper that renders the reusable ProjectForm in "create" mode.
 */
export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
        <p className="text-sm text-muted-foreground">
          Add a new project to your portfolio.
        </p>
      </div>

      <ProjectForm mode="create" />
    </div>
  );
}
