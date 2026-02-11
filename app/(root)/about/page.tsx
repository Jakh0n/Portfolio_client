import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";

export const metadata = {
  title: "About | Jakhon Yokubov",
  description:
    "Full Stack & Mobile Developer based in Seoul, South Korea. 3+ years building web apps, mobile apps, and backend systems.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
