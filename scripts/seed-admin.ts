/**
 * Seed Script — Create your first admin user
 * ────────────────────────────────────────────
 *
 * Run this ONCE after setting up your .env.local:
 *
 *   npx tsx scripts/seed-admin.ts
 *
 * What it does:
 * 1. Connects to your MongoDB database
 * 2. Checks if an admin already exists
 * 3. Creates one if not
 *
 * ⚠️  Change the email and password below before running!
 */

import mongoose from "mongoose";
import AdminModel from "../models/Admin";

/* ── CONFIG: Change these! ── */
const ADMIN_EMAIL = "admin@jakhon.dev";
const ADMIN_PASSWORD = "changeme123"; // Change this to a strong password!
const ADMIN_NAME = "Jakhon Yokubov";
/* ────────────────────────── */

async function seed() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ Missing MONGODB_URI in environment");
    console.error("   Make sure .env.local is set up correctly");
    process.exit(1);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected");

    // Check if admin already exists
    const existing = await AdminModel.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      console.log(`⚠️  Admin "${ADMIN_EMAIL}" already exists. Skipping.`);
    } else {
      // Create new admin — password is auto-hashed by the pre-save hook
      await AdminModel.create({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
      });
      console.log(`✅ Admin created: ${ADMIN_EMAIL}`);
      console.log("   You can now log in at /admin/login");
    }
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

seed();
