import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

/**
 * POST /api/upload
 * ────────────────
 * Protected — only admins can upload images.
 *
 * How it works:
 * 1. Admin picks a file from their computer
 * 2. Browser sends the file as FormData
 * 3. This route receives the file, converts it to a buffer
 * 4. Uploads the buffer to Cloudinary
 * 5. Returns the Cloudinary URL (permanent image link)
 *
 * The image is stored in Cloudinary under "portfolio/" folder.
 */
export async function POST(request: Request) {
  try {
    // Auth check
    const admin = await verifyAuth();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the file from FormData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size must be under 5MB" },
        { status: 400 }
      );
    }

    // Convert file to buffer, then to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: "portfolio", // All images go to portfolio/ folder
      resource_type: "image",
    });

    return NextResponse.json({
      url: result.secure_url, // HTTPS URL to the uploaded image
      publicId: result.public_id, // Cloudinary ID (for deleting later)
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
