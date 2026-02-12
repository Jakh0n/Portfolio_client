"use client";

import { useState, useRef, type FormEvent, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/models/Project";

const CATEGORIES: ProjectCategory[] = ["WEBSITE", "MOBILE APP", "TELEGRAM BOT"];

interface ProjectFormData {
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  tags: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: string;
  initialData?: Partial<ProjectFormData>;
}

export function ProjectForm({
  mode,
  projectId,
  initialData,
}: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProjectFormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    category: initialData?.category ?? "WEBSITE",
    description: initialData?.description ?? "",
    tags: initialData?.tags ?? "",
    image: initialData?.image ?? "",
    liveUrl: initialData?.liveUrl ?? "",
    githubUrl: initialData?.githubUrl ?? "",
    featured: initialData?.featured ?? false,
    order: initialData?.order ?? 0,
  });

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug:
        mode === "create"
          ? title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .trim()
          : prev.slug,
    }));
  }

  async function uploadImage(file: File) {
    setIsUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      setForm((prev) => ({ ...prev, image: data.url }));
      setImageError(false);
    } catch {
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileSelect(files: FileList | null) {
    if (!files || files.length === 0) return;
    uploadImage(files[0]);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function removeImage() {
    setForm((prev) => ({ ...prev, image: "" }));
    setImageError(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const url =
        mode === "create" ? "/api/projects" : `/api/projects/${projectId}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const body = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        order: Number(form.order),
      };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-border/60">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="My Awesome Project"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-destructive">*</span>
              </Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="my-awesome-project"
                required
              />
              <p className="text-xs text-muted-foreground">
                URL: /work/{form.slug || "..."}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Category <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, category: cat }))
                  }
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    form.category === cat
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="A brief description of the project..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={form.tags}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, tags: e.target.value }))
              }
              placeholder="Next.js, React, MongoDB (comma separated)"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Cover Image <span className="text-destructive">*</span>
            </Label>
            {form.image ? (
              <div className="relative w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/60 bg-muted">
                  {imageError ? (
                    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-4 text-center text-sm text-muted-foreground">
                      <p>Image could not be loaded.</p>
                      <p className="text-xs">
                        Check the URL or try uploading again.
                      </p>
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={form.image}
                      alt="Cover preview"
                      className="h-full w-full object-cover object-center"
                      onLoad={() => setImageError(false)}
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
                  title="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border/60 hover:border-border hover:bg-muted/30",
                  isUploading && "pointer-events-none opacity-60",
                )}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mb-3 h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Uploading...
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium text-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WebP or GIF (max 5MB)
                    </p>
                  </>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">
                Or paste image URL:
              </span>
              <Input
                value={form.image}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, image: e.target.value }));
                  setImageError(false);
                }}
                placeholder="https://..."
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                value={form.liveUrl}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, liveUrl: e.target.value }))
                }
                placeholder="https://myproject.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={form.githubUrl}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, githubUrl: e.target.value }))
                }
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    order: parseInt(e.target.value) || 0,
                  }))
                }
                min={0}
              />
              <p className="text-xs text-muted-foreground">
                Lower number = shown first
              </p>
            </div>
            <div className="flex items-end space-x-3 pb-1">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, featured: e.target.checked }))
                }
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured on home page
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-border/40 pt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create Project"
                  : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
