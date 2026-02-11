import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorkSection } from "@/components/WorkSection";

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <WorkSection />
      </main>
      <Footer />
    </div>
  );
}
