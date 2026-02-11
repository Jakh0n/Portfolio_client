import { Marquee } from "@/components/Marquee";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <FeaturedWork />
      </main>
      <Footer />
    </div>
  );
}
