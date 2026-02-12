import mongoose, { Schema, type Document, type Model } from "mongoose";

/**
 * About page — single document (singleton).
 * Stores all content for the public About page.
 */

/* ── Sub-schemas ── */

const IntroSchema = new Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    summary: { type: String, default: "" },
    cta: { type: String, default: "" },
  },
  { _id: false }
);

const StatSchema = new Schema(
  { value: { type: String, default: "" }, label: { type: String, default: "" } },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    company: { type: String, default: "" },
    role: { type: String, default: "" },
    period: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    highlights: { type: [String], default: [] },
  },
  { _id: false }
);

const AboutProjectSchema = new Schema(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    highlights: { type: [String], default: [] },
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    school: { type: String, default: "" },
    degree: { type: String, default: "" },
    period: { type: String, default: "" },
  },
  { _id: false }
);

const StackGroupSchema = new Schema(
  {
    label: { type: String, default: "" },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const LanguageSchema = new Schema(
  {
    language: { type: String, default: "" },
    level: { type: String, default: "" },
  },
  { _id: false }
);

/* ── Main schema ── */

export const ABOUT_DOCUMENT_KEY = "default";

export interface IAbout {
  key: string;
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
  updatedAt: Date;
}

export interface IAboutDocument extends IAbout, Document {}

const AboutSchema = new Schema<IAboutDocument>(
  {
    key: {
      type: String,
      unique: true,
      default: ABOUT_DOCUMENT_KEY,
    },
    intro: { type: IntroSchema, default: () => ({}) },
    stats: { type: [StatSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    projects: { type: [AboutProjectSchema], default: [] },
    education: { type: EducationSchema, default: () => ({}) },
    techStack: { type: [StackGroupSchema], default: [] },
    languages: { type: [LanguageSchema], default: [] },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

const AboutModel: Model<IAboutDocument> =
  mongoose.models.About || mongoose.model<IAboutDocument>("About", AboutSchema);

export default AboutModel;
