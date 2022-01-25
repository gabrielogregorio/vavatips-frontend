/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import NavbarComponent from '../../components/layout/navbar';
import { navbarEnum } from '../../interfaces/navbar';

describe('<NavbarComponent />', () => {
  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.Config} />);

    expect(screen.getByRole('link', { name: 'VAVATIPS' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'criar posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'sugestões' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'perfil' })).toBeInTheDocument();
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.Dashboard} />);
    expect(screen.getByRole('link', { name: 'dashboard' })).toHaveAttribute('class', 'navActive');
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.PostCreate} />);
    expect(screen.getByRole('link', { name: 'criar posts' })).toHaveAttribute('class', 'navActive');
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.ViewPosts} />);
    expect(screen.getByRole('link', { name: 'posts' })).toHaveAttribute('class', 'navActive');
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.SuggestionScreen} />);
    expect(screen.getByRole('link', { name: 'sugestões' })).toHaveAttribute('class', 'navActive');
  });

  it('should render button like', () => {
    render(<NavbarComponent selected={navbarEnum.Profile} />);
    expect(screen.getByRole('link', { name: 'perfil' })).toHaveAttribute('class', 'navActive');
  });
});
