import AdminUserPanel from "@/components/admin/admin-user-panel"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - User Panel",
  description: "Admin interface to manage users",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminUserPanel />
    </div>
  )
}

