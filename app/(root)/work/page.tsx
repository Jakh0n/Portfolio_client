import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorkSection } from "@/components/WorkSection";
import { getAllProjects } from "@/lib/projects";

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <WorkSection projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
