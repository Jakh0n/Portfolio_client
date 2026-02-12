import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";
import { getProjectBySlug } from "@/lib/projects";
import { createPageMetadata } from "@/lib/metadata";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectBySlug(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectBySlug(id);
  if (!project) {
    return createPageMetadata({
      title: "Project not found",
      description: "The requested project could not be found.",
      pathname: `/work/${id}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.description,
    pathname: `/work/${project.slug}`,
    image: project.image,
  });
}
