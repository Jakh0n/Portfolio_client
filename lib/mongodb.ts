import mongoose from "mongoose";

/**
 * Why this file exists:
 * ─────────────────────
 * On Vercel (serverless), every API call runs in its own process.
 * Without caching, each call would open a NEW database connection.
 * This helper caches the connection so we reuse it across calls.
 *
 * How it works:
 * 1. First call → connects to MongoDB, saves the connection in cache
 * 2. Next calls → returns the cached connection (no reconnect)
 */

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Missing MONGODB_URI in .env.local — add your MongoDB Atlas connection string",
  );
}

/**
 * Global cache to persist connection across hot reloads in dev
 * and across serverless invocations in production.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global object so TypeScript doesn't complain
declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

// Persist cache in global for dev hot reloads
global.mongooseCache = cached;

/**
 * Connect to MongoDB.
 * Call this at the start of any API route or Server Action.
 *
 * @example
 * import { connectDB } from "@/lib/mongodb";
 * await connectDB();
 */
export async function connectDB(): Promise<typeof mongoose> {
  // Already connected — return immediately
  if (cached.conn) {
    return cached.conn;
  }

  // No pending connection — start one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false, // fail fast if not connected
    });
  }

  // Wait for connection to finish, then cache it
  cached.conn = await cached.promise;
  return cached.conn;
}
