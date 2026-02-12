import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/**
 * Admin Dashboard Layout
 * ──────────────────────
 * This layout wraps ALL admin pages (except login).
 *
 * It does TWO things:
 * 1. Checks if the user is authenticated → redirects to login if not
 * 2. Renders the sidebar + content area
 *
 * Because this is a Server Component, the auth check happens on the server.
 * The user never sees the admin page if they're not logged in.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check — runs before any HTML is sent
  const admin = await verifyAuth();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar adminEmail={admin.email} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
