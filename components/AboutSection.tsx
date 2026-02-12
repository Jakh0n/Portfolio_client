"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
  Globe,
  Code2,
  FolderOpen,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AboutData } from "@/lib/about";

type ExperienceItem = AboutData["experience"][number];
type ProjectItem = AboutData["projects"][number];
type StackItem = AboutData["techStack"][number];
type LanguageItem = AboutData["languages"][number];

const ACCENT = { bg: "bg-teal-500/10", text: "text-teal-500" } as const;

/* ─── Section heading with icon ─── */
function SectionHeading({
  icon: Icon,
  title,
  index,
}: {
  icon: React.ElementType;
  title: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      className="mb-6 flex items-center gap-3 border-b border-border/40 pb-4"
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          ACCENT.bg,
          ACCENT.text,
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <h2 className="text-xl font-bold uppercase tracking-widest text-foreground sm:text-2xl">
        {title}
      </h2>
    </motion.div>
  );
}

/* ─── Experience card ─── */
function ExperienceCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/20 hover:shadow-lg hover:shadow-teal-500/5">
        <CardContent className="p-5 sm:p-6">
          <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              {item.company}
            </h3>
            <span className="shrink-0 rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-500">
              {item.period}
            </span>
          </div>
          <p className="mb-3 text-sm font-medium text-teal-500">
            {item.subtitle}
          </p>
          <ul className="space-y-2">
            {item.highlights.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500/50"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Project card ─── */
function ProjectCard({ item, index }: { item: ProjectItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/20 hover:shadow-lg hover:shadow-teal-500/5">
        <CardContent className="p-5 sm:p-6">
          <h3 className="mb-1 text-lg font-bold tracking-tight text-foreground">
            {item.title}
          </h3>
          <p className="mb-3 text-sm font-medium text-teal-500">
            {item.subtitle}
          </p>
          <ul className="space-y-2">
            {item.highlights.map((line, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500/50"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Stat card ─── */
function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "text-center transition-all duration-300",
          "hover:border-teal-500/20 hover:shadow-lg hover:shadow-teal-500/5",
          "bg-card/80 backdrop-blur-sm border-border/60",
        )}
      >
        <CardContent className="p-5">
          <p className="text-3xl font-bold tracking-tight text-teal-500 sm:text-4xl">
            {value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Stack group ─── */
function StackGroup({ group, index }: { group: StackItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">
        {group.label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-teal-500/30 hover:bg-teal-500/10"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Language pill ─── */
function LanguagePill({ item, index }: { item: LanguageItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    >
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/20 hover:shadow-lg hover:shadow-teal-500/5">
        <CardContent className="flex items-center justify-between p-4">
          <span className="text-sm font-medium text-foreground">
            {item.language}
          </span>
          <span className="rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-semibold text-teal-500">
            {item.level}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Main section ─── */
interface AboutSectionProps {
  data: AboutData | null;
}

export function AboutSection({ data }: AboutSectionProps) {
  if (!data) {
    return (
      <section
        id="about"
        className="relative overflow-hidden bg-linear-to-b from-muted/20 to-background px-4 py-20 sm:px-6 sm:py-24"
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            About
          </h1>
          <p className="text-muted-foreground">
            About content is not set up yet. Add it from the admin panel.
          </p>
        </div>
      </section>
    );
  }

  const intro = data.intro ?? {};
  const stats = data.stats ?? [];
  const experience = data.experience ?? [];
  const projects = data.projects ?? [];
  const education = data.education ?? {};
  const techStack = data.techStack ?? [];
  const languages = data.languages ?? [];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-linear-to-b from-muted/20 to-background px-4 py-16 sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Background grid */}
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
        className="pointer-events-none absolute -right-32 top-2/3 h-96 w-96 rounded-full bg-chart-3 opacity-15 blur-[120px] animate-[blob-float_18s_ease-in-out_infinite_reverse]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-chart-5 opacity-10 blur-[80px] animate-[gradient-shift_8s_ease-in-out_infinite]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl">
        {/* ── Header / Intro ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {intro.name}
          </h1>
          <p className="mb-3 text-base font-medium text-teal-500 sm:mb-4 sm:text-xl">
            {intro.role}
          </p>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {intro.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {intro.location}
              </span>
            )}
            {intro.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {intro.email}
              </span>
            )}
            {intro.githubUrl && (
              <Link
                href={intro.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/5 px-3 py-1 text-sm font-medium text-teal-500 transition-colors hover:bg-teal-500/10 hover:border-teal-500/50"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </Link>
            )}
            {intro.linkedinUrl && (
              <Link
                href={intro.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/5 px-3 py-1 text-sm font-medium text-teal-500 transition-colors hover:bg-teal-500/10 hover:border-teal-500/50"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </Link>
            )}
          </div>
          {intro.summary && (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {intro.summary}
            </p>
          )}
        </motion.div>

        {/* ── Stats ── */}
        {stats.length > 0 && (
          <div className="mb-14">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Experience ── */}
        {experience.length > 0 && (
          <div className="mb-14">
            <SectionHeading icon={Briefcase} title="Experience" index={0} />
            <div className="space-y-4">
              {experience.map((item, i) => (
                <ExperienceCard key={`${item.company}-${i}`} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Projects ── */}
        {projects.length > 0 && (
          <div className="mb-14">
            <SectionHeading icon={FolderOpen} title="Projects" index={1} />
            <div className="space-y-4">
              {projects.map((item, i) => (
                <ProjectCard key={`${item.title}-${i}`} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Education ── */}
        {(education.school || education.degree) && (
          <div className="mb-14">
            <SectionHeading icon={GraduationCap} title="Education" index={2} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/20 hover:shadow-lg hover:shadow-teal-500/5">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {education.school}
                    </h3>
                    {education.period && (
                      <span className="shrink-0 rounded-full bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-500">
                        {education.period}
                      </span>
                    )}
                  </div>
                  {education.degree && (
                    <p className="mt-1 text-sm font-medium text-teal-500">
                      {education.degree}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* ── Skills ── */}
        {techStack.length > 0 && (
          <div className="mb-14">
            <SectionHeading icon={Code2} title="Skills" index={3} />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {techStack.map((group, i) => (
                <StackGroup key={group.label} group={group} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Languages ── */}
        {languages.length > 0 && (
          <div className="mb-14">
            <SectionHeading icon={Globe} title="Languages" index={4} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {languages.map((item, i) => (
                <LanguagePill key={`${item.language}-${i}`} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border/60 bg-card/80 p-8 text-center backdrop-blur-sm sm:p-12"
        >
          {intro.cta && (
            <p className="mb-4 text-lg font-medium text-foreground sm:text-xl">
              {intro.cta}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">See my work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
