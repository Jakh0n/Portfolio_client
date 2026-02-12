import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await verifyAuth();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen w-full min-w-0 bg-background">
      <AdminSidebar adminEmail={admin.email} />
      <main className="min-w-0 flex-1 overflow-auto">
        <div className="mx-auto min-w-0 max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
