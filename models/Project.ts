import mongoose, { Schema, type Document, type Model } from "mongoose";

/**
 * What is a Mongoose Model?
 * ─────────────────────────
 * A model is a wrapper around a MongoDB "collection" (like a table in SQL).
 * The schema below defines what fields each document (row) can have,
 * their types, and validation rules.
 *
 * When you call ProjectModel.create({...}), Mongoose:
 * 1. Validates the data against this schema
 * 2. Inserts it into the "projects" collection in MongoDB
 */

/* ── Types ── */

export type ProjectCategory = "WEBSITE" | "MOBILE APP" | "TELEGRAM BOT";

export interface IProject {
  title: string;
  slug: string; // URL-friendly ID (e.g. "dom-stroy")
  category: ProjectCategory;
  description: string;
  tags: string[];
  image: string; // cover image URL
  liveUrl?: string; // link to live project
  githubUrl?: string; // link to source code
  featured: boolean; // show on home page?
  order: number; // display order (lower = first)
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectDocument extends IProject, Document {}

/* ── Schema ── */

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["WEBSITE", "MOBILE APP", "TELEGRAM BOT"],
        message: "Category must be WEBSITE, MOBILE APP, or TELEGRAM BOT",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: [true, "Cover image is required"],
    },
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    /**
     * timestamps: true → Mongoose auto-adds createdAt & updatedAt fields.
     * Every time you save a document, updatedAt updates automatically.
     */
    timestamps: true,
  }
);

/**
 * Why this pattern?
 * ─────────────────
 * In serverless/dev, this file might run multiple times (hot reload).
 * mongoose.models.Project checks if the model already exists.
 * If yes → reuse it. If no → create it.
 * Without this, you'd get "Cannot overwrite model" errors.
 */
const ProjectModel: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default ProjectModel;
