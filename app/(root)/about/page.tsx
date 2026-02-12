import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { getAbout } from "@/lib/about";

export const metadata = {
  title: "About | Jakhon Yokubov",
  description:
    "Full Stack & Mobile Developer based in Seoul, South Korea. 3+ years building web apps, mobile apps, and backend systems.",
};

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
