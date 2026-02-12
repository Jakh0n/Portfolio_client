import { connectDB } from "@/lib/mongodb";
import AboutModel, { ABOUT_DOCUMENT_KEY } from "@/models/About";

/**
 * About page data shape (for public display).
 * Matches the Mongoose document minus internal fields.
 */
export interface AboutData {
  intro: {
    name: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    githubUrl: string;
    linkedinUrl: string;
    summary: string;
    cta: string;
  };
  stats: Array<{ value: string; label: string }>;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    subtitle: string;
    highlights: string[];
  }>;
  projects: Array<{
    title: string;
    subtitle: string;
    highlights: string[];
  }>;
  education: { school: string; degree: string; period: string };
  techStack: Array<{ label: string; items: string[] }>;
  languages: Array<{ language: string; level: string }>;
}

export async function getAbout(): Promise<AboutData | null> {
  await connectDB();
  const doc = await AboutModel.findOne({ key: ABOUT_DOCUMENT_KEY }).lean();

  if (!doc) return null;

  const d = doc as unknown as Record<string, unknown>;
  return {
    intro: (d.intro as AboutData["intro"]) ?? {},
    stats: (d.stats as AboutData["stats"]) ?? [],
    experience: (d.experience as AboutData["experience"]) ?? [],
    projects: (d.projects as AboutData["projects"]) ?? [],
    education: (d.education as AboutData["education"]) ?? {},
    techStack: (d.techStack as AboutData["techStack"]) ?? [],
    languages: (d.languages as AboutData["languages"]) ?? [],
  };
}
