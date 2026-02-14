import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { getAbout } from "@/lib/about";

export default async function AboutPage() {
  const data = await getAbout();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutSection data={data} />
      </main>
      <Footer />
    </div>
  );
}
