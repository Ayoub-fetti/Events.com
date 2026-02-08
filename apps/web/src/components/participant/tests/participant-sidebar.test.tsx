import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ParticipantSidebar from '../participant-sidebar';

jest.mock('next/navigation', () => ({
  usePathname: () => '/participant/dashboard',
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({ logout: jest.fn(), loading: false }),
}));

describe('ParticipantSidebar', () => {
  it('affiche le titre My Events', () => {
    render(<ParticipantSidebar />);
    expect(screen.getByText('My Events')).toBeInTheDocument();
  });

  it('affiche tous les liens de navigation', () => {
    render(<ParticipantSidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Browse Events')).toBeInTheDocument();
    expect(screen.getByText('My Reservations')).toBeInTheDocument();
  });

  it('affiche le bouton Logout', () => {
    render(<ParticipantSidebar />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
