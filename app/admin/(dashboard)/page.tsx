import Link from "next/link";
import { FolderOpen, Plus } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Admin Dashboard
 * ───────────────
 * Overview page showing quick stats and shortcuts.
 * This is a Server Component — data is fetched on the server.
 */
export default async function AdminDashboardPage() {
  await connectDB();

  const totalProjects = await ProjectModel.countDocuments();
  const featuredProjects = await ProjectModel.countDocuments({
    featured: true,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back. Here&apos;s your portfolio overview.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalProjects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Featured
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{featuredProjects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link
              href="/admin/projects"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              Manage projects →
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              View live site →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
