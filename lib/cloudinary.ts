import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary Configuration
 * ────────────────────────
 * Cloudinary stores your uploaded images in the cloud.
 * Free tier: 25GB storage, 25GB bandwidth/month.
 *
 * Setup:
 * 1. Go to https://cloudinary.com → sign up (free)
 * 2. Go to Dashboard → copy cloud_name, api_key, api_secret
 * 3. Paste them into .env.local
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
