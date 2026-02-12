import mongoose, { Schema, type Document, type Model } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Admin model — stores login credentials for the admin panel.
 *
 * Security notes:
 * ───────────────
 * - Password is HASHED with bcrypt before saving (never stored as plain text)
 * - The "pre save" hook runs automatically before every .save() call
 * - comparePassword() method lets you verify a login attempt
 */

/* ── Types ── */

export interface IAdmin {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminDocument extends IAdmin, Document {
  /** Compare a plain-text password against the stored hash */
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/* ── Schema ── */

const AdminSchema = new Schema<IAdminDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

/**
 * Pre-save hook — hash password before storing in database.
 *
 * How bcrypt works:
 * 1. Takes your plain password ("mySecret123")
 * 2. Generates a random "salt" (random string)
 * 3. Combines them into a hash ("$2a$12$K8xY...")
 * 4. The hash is ONE-WAY — you can't reverse it to get the password
 * 5. To verify, bcrypt hashes the input again and compares hashes
 *
 * The "12" is the salt rounds — higher = slower but more secure.
 */
AdminSchema.pre("save", async function () {
  // Only hash if password was changed (not on every save)
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Instance method — compare a login attempt password against the hash.
 * Returns true if they match, false otherwise.
 */
AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const AdminModel: Model<IAdminDocument> =
  mongoose.models.Admin || mongoose.model<IAdminDocument>("Admin", AdminSchema);

export default AdminModel;
