import { Marquee } from "@/components/Marquee";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { WorkSection } from "@/components/WorkSection";
import { getFeaturedProjects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = {
  ...createPageMetadata({
    pathname: "/",
  }),
};

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <WorkSection projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
