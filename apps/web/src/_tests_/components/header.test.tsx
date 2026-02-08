import { render, screen } from '@testing-library/react';
import Header from '../../components/layout/header';

describe('Header', () => {
  it('affiche le logo Events.com', () => {
    render(<Header />);
    expect(screen.getByText('Events.com')).toBeInTheDocument();
  });

  it('affiche les liens Sign in et Get Started', () => {
    render(<Header />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('les liens pointent vers les bonnes routes', () => {
    render(<Header />);
    expect(screen.getByText('Sign in').closest('a')).toHaveAttribute(
      'href',
      '/auth/login',
    );
    expect(screen.getByText('Get Started').closest('a')).toHaveAttribute(
      'href',
      '/auth/register',
    );
  });
});
