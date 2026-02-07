import AdminSidebar from '@/components/admin/admin-sidebar';
import ProtectedRoute from '@/components/auth/protected-route';
import { Role } from '@/types/user.types';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN]}>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
