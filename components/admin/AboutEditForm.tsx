"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { AboutData } from "@/lib/about";

const emptyIntro = (): AboutData["intro"] => ({
  name: "",
  role: "",
  location: "",
  email: "",
  phone: "",
  githubUrl: "",
  linkedinUrl: "",
  summary: "",
  cta: "",
});

const emptyEducation = (): AboutData["education"] => ({
  school: "",
  degree: "",
  period: "",
});

const emptyAbout = (): AboutData => ({
  intro: emptyIntro(),
  stats: [],
  experience: [],
  projects: [],
  education: emptyEducation(),
  techStack: [],
  languages: [],
});

export function AboutEditForm() {
  const router = useRouter();
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        setData(json ?? emptyAbout());
      })
      .catch(() => setData(emptyAbout()))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setError("");
    setIsSaving(true);
    try {
      const res = await fetch("/api/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "Failed to save");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) return null;

  const updateIntro = (key: keyof AboutData["intro"], value: string) =>
    setData((prev) =>
      prev ? { ...prev, intro: { ...prev.intro, [key]: value } } : prev,
    );

  const updateEducation = (key: keyof AboutData["education"], value: string) =>
    setData((prev) =>
      prev ? { ...prev, education: { ...prev.education, [key]: value } } : prev,
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Intro */}
      <Card>
        <CardHeader>
          <CardTitle>Intro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={data.intro.name}
                onChange={(e) => updateIntro("name", e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                value={data.intro.role}
                onChange={(e) => updateIntro("role", e.target.value)}
                placeholder="Full Stack Developer"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={data.intro.location}
                onChange={(e) => updateIntro("location", e.target.value)}
                placeholder="Seoul, South Korea"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={data.intro.email}
                onChange={(e) => updateIntro("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={data.intro.phone}
                onChange={(e) => updateIntro("phone", e.target.value)}
                placeholder="+82 010 1234 5678"
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input
                value={data.intro.githubUrl}
                onChange={(e) => updateIntro("githubUrl", e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input
              value={data.intro.linkedinUrl}
              onChange={(e) => updateIntro("linkedinUrl", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea
              value={data.intro.summary}
              onChange={(e) => updateIntro("summary", e.target.value)}
              placeholder="Short bio..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label>CTA text</Label>
            <Input
              value={data.intro.cta}
              onChange={(e) => updateIntro("cta", e.target.value)}
              placeholder="Have a project? Let's build it together."
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stats</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      stats: [...prev.stats, { value: "", label: "" }],
                    }
                  : prev,
              )
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Value (e.g. 3+)"
                value={stat.value}
                onChange={(e) =>
                  setData((prev) => {
                    if (!prev) return prev;
                    const next = [...prev.stats];
                    next[i] = { ...next[i], value: e.target.value };
                    return { ...prev, stats: next };
                  })
                }
              />
              <Input
                placeholder="Label (e.g. Years experience)"
                value={stat.label}
                onChange={(e) =>
                  setData((prev) => {
                    if (!prev) return prev;
                    const next = [...prev.stats];
                    next[i] = { ...next[i], label: e.target.value };
                    return { ...prev, stats: next };
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setData((prev) =>
                    prev
                      ? {
                          ...prev,
                          stats: prev.stats.filter((_, j) => j !== i),
                        }
                      : prev,
                  )
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Experience</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      experience: [
                        ...prev.experience,
                        {
                          company: "",
                          role: "",
                          period: "",
                          subtitle: "",
                          highlights: [],
                        },
                      ],
                    }
                  : prev,
              )
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.experience.map((exp, i) => (
            <div
              key={i}
              className="rounded-lg border border-border/60 p-4 space-y-3"
            >
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  #{i + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setData((prev) =>
                      prev
                        ? {
                            ...prev,
                            experience: prev.experience.filter(
                              (_, j) => j !== i,
                            ),
                          }
                        : prev,
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      setData((prev) => {
                        if (!prev) return prev;
                        const next = [...prev.experience];
                        next[i] = { ...next[i], company: e.target.value };
                        return { ...prev, experience: next };
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>Role</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) =>
                      setData((prev) => {
                        if (!prev) return prev;
                        const next = [...prev.experience];
                        next[i] = { ...next[i], role: e.target.value };
                        return { ...prev, experience: next };
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Period</Label>
                  <Input
                    value={exp.period}
                    onChange={(e) =>
                      setData((prev) => {
                        if (!prev) return prev;
                        const next = [...prev.experience];
                        next[i] = { ...next[i], period: e.target.value };
                        return { ...prev, experience: next };
                      })
                    }
                    placeholder="Jan 2024 — Present"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Subtitle</Label>
                  <Input
                    value={exp.subtitle}
                    onChange={(e) =>
                      setData((prev) => {
                        if (!prev) return prev;
                        const next = [...prev.experience];
                        next[i] = { ...next[i], subtitle: e.target.value };
                        return { ...prev, experience: next };
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Highlights (one per line)</Label>
                <Textarea
                  value={exp.highlights.join("\n")}
                  onChange={(e) =>
                    setData((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.experience];
                      next[i] = {
                        ...next[i],
                        highlights: e.target.value.split("\n").filter(Boolean),
                      };
                      return { ...prev, experience: next };
                    })
                  }
                  rows={3}
                  placeholder="One highlight per line"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects (About page projects, not work projects) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects (CV-style)</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      projects: [
                        ...prev.projects,
                        { title: "", subtitle: "", highlights: [] },
                      ],
                    }
                  : prev,
              )
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.projects.map((proj, i) => (
            <div
              key={i}
              className="rounded-lg border border-border/60 p-4 space-y-3"
            >
              <div className="flex justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  #{i + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setData((prev) =>
                      prev
                        ? {
                            ...prev,
                            projects: prev.projects.filter((_, j) => j !== i),
                          }
                        : prev,
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={proj.title}
                  onChange={(e) =>
                    setData((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.projects];
                      next[i] = { ...next[i], title: e.target.value };
                      return { ...prev, projects: next };
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={proj.subtitle}
                  onChange={(e) =>
                    setData((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.projects];
                      next[i] = { ...next[i], subtitle: e.target.value };
                      return { ...prev, projects: next };
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Highlights (one per line)</Label>
                <Textarea
                  value={proj.highlights.join("\n")}
                  onChange={(e) =>
                    setData((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.projects];
                      next[i] = {
                        ...next[i],
                        highlights: e.target.value.split("\n").filter(Boolean),
                      };
                      return { ...prev, projects: next };
                    })
                  }
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>School</Label>
            <Input
              value={data.education.school}
              onChange={(e) => updateEducation("school", e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Degree</Label>
              <Input
                value={data.education.degree}
                onChange={(e) => updateEducation("degree", e.target.value)}
                placeholder="Bachelor — Business Administration"
              />
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Input
                value={data.education.period}
                onChange={(e) => updateEducation("period", e.target.value)}
                placeholder="May 2023 — Mar 2027"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills / Tech Stack</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      techStack: [...prev.techStack, { label: "", items: [] }],
                    }
                  : prev,
              )
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Add group
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.techStack.map((group, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1 space-y-1">
                <Label>Label (e.g. Frontend)</Label>
                <Input
                  value={group.label}
                  onChange={(e) =>
                    setData((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.techStack];
                      next[i] = { ...next[i], label: e.target.value };
                      return { ...prev, techStack: next };
                    })
                  }
                />
                <Label className="text-xs text-muted-foreground">
                  Items (comma-separated)
                </Label>
                <Input
                  value={group.items.join(", ")}
                  onChange={(e) =>
                    setData((prev) => {
                      if (!prev) return prev;
                      const next = [...prev.techStack];
                      next[i] = {
                        ...next[i],
                        items: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      };
                      return { ...prev, techStack: next };
                    })
                  }
                  placeholder="React, Next.js, TypeScript"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-8"
                onClick={() =>
                  setData((prev) =>
                    prev
                      ? {
                          ...prev,
                          techStack: prev.techStack.filter((_, j) => j !== i),
                        }
                      : prev,
                  )
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Languages</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      languages: [
                        ...prev.languages,
                        { language: "", level: "" },
                      ],
                    }
                  : prev,
              )
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.languages.map((lang, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Language"
                value={lang.language}
                onChange={(e) =>
                  setData((prev) => {
                    if (!prev) return prev;
                    const next = [...prev.languages];
                    next[i] = { ...next[i], language: e.target.value };
                    return { ...prev, languages: next };
                  })
                }
              />
              <Input
                placeholder="Level"
                value={lang.level}
                onChange={(e) =>
                  setData((prev) => {
                    if (!prev) return prev;
                    const next = [...prev.languages];
                    next[i] = { ...next[i], level: e.target.value };
                    return { ...prev, languages: next };
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setData((prev) =>
                    prev
                      ? {
                          ...prev,
                          languages: prev.languages.filter((_, j) => j !== i),
                        }
                      : prev,
                  )
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3 border-t border-border/40 pt-6">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save About Page"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.open("/about", "_blank")}
        >
          Preview
        </Button>
      </div>
    </form>
  );
}
