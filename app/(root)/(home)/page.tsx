import { Marquee } from "@/components/Marquee";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { WorkSection } from "@/components/WorkSection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <WorkSection />
      </main>
      <Footer />
    </div>
  );
}
