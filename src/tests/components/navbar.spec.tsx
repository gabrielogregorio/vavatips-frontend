import { render, screen } from '@testing-library/react';
import { Navbar } from '@/layout/navbar';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { navbarEnum } from '@/enums/navbar';
import userEvent from '@testing-library/user-event';
import { MockApp } from '@/mock/App.Mock';

describe('<Navbar />', () => {
  it('should render button like', () => {
    render(<Navbar selected={navbarEnum.None} modelNavbar={modelNavbarAdmin} />);

    expect(screen.getByRole('link', { name: 'VALORANT TIPS' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'criar posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'posts' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'sugestões' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'perfil' })).toBeInTheDocument();
  });

  it('should test change themes', async () => {
    render(
      <MockApp
        localstorage={{
          theme: '',
        }}>
        <Navbar selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />
      </MockApp>,
    );

    expect(localStorage.getItem('theme')).toEqual('dark');

    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toEqual('light');

    await userEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toEqual('dark');
  });
});
