import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminSidebar from '../../components/admin/admin-sidebar';

jest.mock('next/navigation', () => ({
  usePathname: () => '/admin/dashboard',
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({ logout: jest.fn(), loading: false }),
}));

describe('AdminSidebar', () => {
  it('affiche le titre Admin Panel', () => {
    render(<AdminSidebar />);
    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  });

  it('affiche tous les liens de navigation', () => {
    render(<AdminSidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('affiche le bouton Logout', () => {
    render(<AdminSidebar />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
