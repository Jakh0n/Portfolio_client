/**
 * Work section constants
 * ──────────────────────
 * Types and accent colors shared across the app.
 * Project DATA now comes from MongoDB (not hardcoded here).
 */

export type WorkCategory = "WEBSITE" | "MOBILE APP" | "TELEGRAM BOT";

export const WORK_ACCENT: Record<WorkCategory, string> = {
  WEBSITE: "#7eb8f7",
  "MOBILE APP": "#f7a96a",
  "TELEGRAM BOT": "#7af7b8",
} as const;

/** Shape of a project returned from the database */
export interface WorkProject {
  _id: string;
  title: string;
  slug: string;
  category: WorkCategory;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
