/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import NavbarComponent from '@/layout/navbar';
import { modelNavbarAdmin } from '@/schemas/navbar';
import navbarEnum from '@/interfaces/navbar';

describe('<NavbarComponent />', () => {
  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.None} modelNavbar={modelNavbarAdmin} />);

    expect(screen.getByRole('link', { name: 'VAVATIPS' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'criar posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'sugestões' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'perfil' })).toBeInTheDocument();
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.Dashboard} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'dashboard' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.PostCreate} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'criar posts' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.ViewPosts} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'posts' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(
      <NavbarComponent selected={navbarEnum.SuggestionScreen} modelNavbar={modelNavbarAdmin} />,
    );
    expect(screen.getByRole('link', { name: 'sugestões' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'perfil' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });
});
