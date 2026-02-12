import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-b from-muted/20 to-background">
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
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-chart-1 opacity-20 blur-[100px] animate-[blob-float_15s_ease-in-out_infinite]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-chart-3 opacity-15 blur-[120px] animate-[blob-float_18s_ease-in-out_infinite_reverse]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-chart-5 opacity-10 blur-[80px] animate-[gradient-shift_8s_ease-in-out_infinite]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-28 md:py-36">
        <p
          className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:mb-4 sm:text-sm animate-[fade-in-up_0.6s_ease-out_both]"
          style={{ animationDelay: "0.1s" }}
        >
          Jakhon Yokubov · Full Stack & Mobile Developer
        </p>
        <h1
          className="mb-3 text-2xl font-bold leading-tight tracking-tight text-foreground sm:mb-4 sm:text-4xl md:text-5xl animate-[fade-in-up_0.6s_ease-out_both]"
          style={{ animationDelay: "0.2s" }}
        >
          Ideas are fragile things.
        </h1>
        <p
          className="mb-2 text-lg italic text-muted-foreground sm:text-xl animate-[fade-in-up_0.6s_ease-out_both]"
          style={{ animationDelay: "0.25s" }}
        >
          They live between a thought and a deadline.
        </p>
        <p
          className="mb-10 text-base text-muted-foreground sm:text-lg animate-[fade-in-up_0.6s_ease-out_both]"
          style={{ animationDelay: "0.35s" }}
        >
          I catch them before they fade — and ship them before the world moves
          on.
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 animate-[fade-in-up_0.6s_ease-out_both]"
          style={{ animationDelay: "0.5s" }}
        >
          <Button asChild size="lg" className="shadow-lg shadow-primary/20">
            <Link href="/work">View my work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
        <div
          className="mt-10 flex justify-center sm:mt-14 animate-[fade-in-up_0.6s_ease-out_both]"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30">
            <span className="mt-1.5 h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" />
          </span>
        </div>
      </div>
    </section>
  );
}
