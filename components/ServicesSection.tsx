"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVICES, type ServiceItem } from "@/constants/services";
import { cn } from "@/lib/utils";

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all duration-300",
          "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
          "bg-card/80 backdrop-blur-sm border-border/60",
        )}
      >
        <CardHeader className="space-y-1.5 pb-2">
          <CardDescription className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {service.tagline}
          </CardDescription>
          <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {service.description}
          </p>
        </CardContent>
      </Card>
    </motion.li>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-border/40 bg-linear-to-b from-background to-muted/20 px-4 py-16 sm:px-6 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-chart-3 opacity-15 blur-[100px] animate-[blob-float_18s_ease-in-out_infinite_reverse]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/3 h-96 w-96 rounded-full bg-chart-1 opacity-10 blur-[120px] animate-[blob-float_15s_ease-in-out_infinite]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-8 border-b border-border/40 pb-6 sm:mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-500 sm:text-sm">
            Is there a problem?
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            What solution do you want?
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
