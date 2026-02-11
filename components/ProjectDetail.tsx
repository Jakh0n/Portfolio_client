import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WORK_ACCENT, type WorkProject } from "@/constants/work";

interface ProjectDetailProps {
  project: WorkProject;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const accent = WORK_ACCENT[project.category];

  return (
    <article className="min-h-screen">
      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/work"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to work
        </Link>

        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 12px ${accent}`,
              }}
              aria-hidden
            />
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {project.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
        </header>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-border/50 bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {project.tags.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                Tech stack
              </h2>
              <ul className="flex flex-wrap gap-2" role="list">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
