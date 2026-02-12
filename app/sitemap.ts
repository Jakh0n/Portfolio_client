import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().toString().replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/work`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];

  try {
    const projects = await getAllProjects();
    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    }));

    return [...staticRoutes, ...projectRoutes];
  } catch {
    // If DB is unavailable during build/runtime, still serve static URLs.
    return staticRoutes;
  }
}
