import type { Metadata } from 'next';
import './globals.css';
import ErrorBoundary from '@/components/shared/error-boundary';

export const metadata: Metadata = {
  title: 'Events.com',
  description: "Plateforme de gestion d'événements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
