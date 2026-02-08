import ParticipantSidebar from '@/components/participant/participant-sidebar';
import ProtectedRoute from '@/components/auth/protected-route';
import { Role } from '@/types/user.types';

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={[Role.PARTICIPANT]}>
      <div className="flex min-h-screen bg-gray-100">
        <ParticipantSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
