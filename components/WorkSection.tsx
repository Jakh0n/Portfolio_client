"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { WORK_ACCENT, type WorkProject } from "@/constants/work";

/**
 * WorkSection now receives projects as props (fetched on the server).
 * This keeps the component a client component (for Framer Motion)
 * while the DATA is fetched server-side (fast, SEO-friendly).
 */

interface WorkSectionProps {
  projects: WorkProject[];
}

function WorkCard({
  project,
  index,
  size,
}: {
  project: WorkProject;
  index: number;
  size: "large" | "medium" | "small";
}) {
  const accent = WORK_ACCENT[project.category] ?? "#7eb8f7";

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      }}
      className={size === "large" ? "col-span-2 row-span-2" : ""}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-border/50 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          quality={90}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={
            size === "large"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 25vw"
          }
        />

        <div
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"
          aria-hidden
        />

        {/* Card content — hidden on hover */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-end p-5 opacity-100 transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0 sm:p-6 lg:p-7">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }}
                aria-hidden
              />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-xs"
                style={{ color: accent }}
              >
                {project.category}
              </span>
            </div>

            <h3
              className={`font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${
                size === "large"
                  ? "text-2xl sm:text-3xl lg:text-4xl"
                  : size === "medium"
                    ? "text-xl sm:text-2xl"
                    : "text-lg sm:text-xl"
              }`}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Hover: corner gradients */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 0% 0%, ${accent}40 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 100% 0%, ${accent}25 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 0% 100%, ${accent}25 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 100% 100%, ${accent}40 0%, transparent 50%)
            `,
          }}
          aria-hidden
        />

        {/* Hover: blur overlay */}
        <div
          className="absolute inset-0 z-20 rounded-2xl bg-black/30 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />

        {/* Hover: view more */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:bottom-5 sm:right-5 sm:translate-x-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            View more
          </span>
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            style={{ boxShadow: `0 0 20px ${accent}40` }}
          >
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

/** Assign card sizes based on position: first = large, next 2 = medium, rest = small */
function getCardSize(index: number): "large" | "medium" | "small" {
  if (index === 0) return "large";
  if (index <= 2) return "medium";
  return "small";
}

export function WorkSection({ projects }: WorkSectionProps) {
  if (projects.length === 0) {
    return (
      <section
        id="work"
        className="relative overflow-hidden border-b border-border/40 bg-linear-to-b from-muted/20 to-background px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
      >
        <div className="relative mx-auto max-w-6xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Recently Finished Works
          </h2>
          <p className="text-muted-foreground">
            Projects coming soon. Stay tuned.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      className="relative overflow-hidden border-b border-border/40 bg-linear-to-b from-muted/20 to-background px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
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

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-2 border-b border-border/40 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Recently Finished Works
          </h2>
        </div>

        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6"
          role="list"
        >
          {projects.map((project, index) => (
            <WorkCard
              key={project._id}
              project={project}
              index={index}
              size={getCardSize(index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
