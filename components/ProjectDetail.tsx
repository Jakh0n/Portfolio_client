import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ExternalLink, Github } from "lucide-react";
import { WORK_ACCENT, type WorkProject } from "@/constants/work";
import { Button } from "@/components/ui/button";

interface ProjectDetailProps {
  project: WorkProject;
}

/** Renders plain-text description with paragraphs (double newline) and line breaks (single newline). */
function FormattedDescription({ text }: { text: string }) {
  if (!text?.trim()) return null;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
  if (paragraphs.length === 0) return null;
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="max-w-full wrap-break-word text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {paragraph.split("\n").map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const accent = WORK_ACCENT[project.category] ?? "#7eb8f7";

  return (
    <article className="min-h-screen min-w-0">
      <div className="relative mx-auto min-w-0 max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <header className="mb-6 sm:mb-10">
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
        </header>

        <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-border/50 bg-muted sm:mb-10 sm:rounded-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        <div className="min-w-0 space-y-5 sm:space-y-6">
          <FormattedDescription text={project.description} />

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.liveUrl && (
                <Button asChild variant="outline">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Site
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </Link>
                </Button>
              )}
            </div>
          )}

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
