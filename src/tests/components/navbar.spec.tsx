import { render, screen } from '@testing-library/react';
import { Navbar } from '@/layout/navbar';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { navbarEnum } from '@/enums/navbar';
import userEvent from '@testing-library/user-event';
import MockApp from '../mock/App.Mock';

describe('<Navbar />', () => {
  it('should render button like', () => {
    render(<Navbar selected={navbarEnum.None} modelNavbar={modelNavbarAdmin} />);

    expect(screen.getByRole('link', { name: 'VAVATIPS' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'criar posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'sugestões' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'perfil' })).toBeInTheDocument();
  });

  it('should render button like', () => {
    render(<Navbar selected={navbarEnum.Dashboard} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'dashboard' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(<Navbar selected={navbarEnum.PostCreate} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'criar posts' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(<Navbar selected={navbarEnum.ViewPosts} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'posts' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(<Navbar selected={navbarEnum.SuggestionScreen} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'sugestões' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should render button like', () => {
    render(<Navbar selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />);
    expect(screen.getByRole('link', { name: 'perfil' })).toHaveAttribute(
      'class',
      'p-2 text-xl border-b-2 border-cyan-50',
    );
  });

  it('should test change themes', () => {
    render(
      <MockApp
        localstorage={{
          theme: '',
        }}>
        <Navbar selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />
      </MockApp>,
    );

    expect(localStorage.getItem('theme')).toEqual('dark');

    userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toEqual('light');

    userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toEqual('dark');
  });
});
