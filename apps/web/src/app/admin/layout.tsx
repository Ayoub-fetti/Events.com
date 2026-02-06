import ParticipantSidebar from '@/components/participant/participant-sidebar';
import ProtectedRoute from '@/components/auth/protected-route';

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        <ParticipantSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
