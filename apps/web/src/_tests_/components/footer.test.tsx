import { render, screen } from '@testing-library/react';
import Footer from '../../components/layout/footer';

describe('Footer', () => {
  it('affiche le logo Events.com', () => {
    render(<Footer />);
    expect(screen.getByText('Events.com')).toBeInTheDocument();
  });

  it('affiche les sections Product, Company et Legal', () => {
    render(<Footer />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it("affiche le copyright avec l'année actuelle", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Events.com. All rights reserved.`),
    ).toBeInTheDocument();
  });

  it('affiche les liens sociaux', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
  });
});
