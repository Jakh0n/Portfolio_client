import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicesSection } from "@/components/ServicesSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Services",
    description:
      "Full-stack web development, mobile apps, APIs, and product engineering support.",
    pathname: "/services",
  }),
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
