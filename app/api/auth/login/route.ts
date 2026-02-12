import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AdminModel from "@/models/Admin";
import { setAuthCookie } from "@/lib/auth";

/**
 * POST /api/auth/login
 * ────────────────────
 * Accepts: { email, password }
 * Returns: { success: true, admin: { name, email } }
 *
 * Flow:
 * 1. Parse the request body
 * 2. Connect to database
 * 3. Find admin by email
 * 4. Compare password with stored hash
 * 5. Create JWT token and set it as a cookie
 * 6. Return success response
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find admin by email
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      // Don't reveal if email exists — say "Invalid credentials" for both
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT and set cookie
    await setAuthCookie({
      adminId: admin._id.toString(),
      email: admin.email,
    });

    return NextResponse.json({
      success: true,
      admin: { name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
