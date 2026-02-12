"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Edit, Trash2, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Project List Component
 * ──────────────────────
 * Client component that displays projects as a table/list.
 * Handles delete action (needs client interactivity).
 */

interface ProjectListItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

interface ProjectListProps {
  projects: ProjectListItem[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    // Confirm before deleting — this is destructive
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to delete");
        return;
      }

      // Refresh server data
      router.refresh();
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16">
        <p className="mb-2 text-lg font-medium text-muted-foreground">
          No projects yet
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Create your first project to get started.
        </p>
        <Button asChild>
          <Link href="/admin/projects/new">Create Project</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/40 bg-muted/30">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Project
            </th>
            <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
              Category
            </th>
            <th className="hidden px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
              Order
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {projects.map((project) => (
            <tr
              key={project._id}
              className={cn(
                "transition-colors hover:bg-muted/20",
                deletingId === project._id && "opacity-50"
              )}
            >
              {/* Project info */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt=""
                    className="h-10 w-14 shrink-0 rounded object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{project.title}</span>
                      {project.featured && (
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      /{project.slug}
                    </span>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="hidden px-4 py-3 sm:table-cell">
                <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {project.category}
                </span>
              </td>

              {/* Order */}
              <td className="hidden px-4 py-3 text-center text-sm text-muted-foreground md:table-cell">
                {project.order}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={`/work/${project.slug}`}
                      target="_blank"
                      title="View live"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={`/admin/projects/${project._id}`}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(project._id, project.title)}
                    disabled={deletingId === project._id}
                    title="Delete"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
