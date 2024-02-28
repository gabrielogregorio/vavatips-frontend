import { screen, render } from '@testing-library/react';
import Router from 'next/router';
import Dashboard from '@/pages/admin/dashboard';
import { MockApp } from '@/mock/App.Mock';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { Api } from '@/services/api';
import { CreateAxiosErrorMock, createResponseMock } from '@/mock/createResponseMock';

const spyOn = jest.spyOn(Api, 'get');

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '',
    pathname: '',
    query: { map: 'Ascent32' },
    route: '/',
  }),
}));

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);

describe('<Dashboard />', () => {
  it('should render dashboard', async () => {
    spyOn.mockImplementation((config) => {
      if (config === '/dashboard') {
        return createResponseMock(
          {
            countAlAgents: 30,
            countAlMaps: 15,
            countAll: 134,
            countAllPosts: 190,
            countAllSuggestions: 10,
            countAllUsers: 3,
            countIps: 318,
          },
          200,
        );
      }

      if (config === '/user') {
        return createResponseMock(
          {
            id: '12345678',
            image: 'image.png',
            username: 'codigo limpo?',
          },
          200,
        );
      }

      throw new Error('unknown');
    });
    render(
      <MockApp>
        <Dashboard />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByText('Bem vindo(a) codigo limpo?')).toBeInTheDocument();
    expect(screen.getByText('Consultas: 134')).toBeInTheDocument();
    expect(screen.getByText('Usuários: 318')).toBeInTheDocument();
    expect(screen.getByText('agentes: 30')).toBeInTheDocument();
    expect(screen.getByText('mapas: 15')).toBeInTheDocument();
    expect(screen.getByText('posts: 190')).toBeInTheDocument();
    expect(screen.getByText('sugestões: 10')).toBeInTheDocument();
    expect(screen.getByText('administradores: 3')).toBeInTheDocument();
  });

  it('should force error jwt', async () => {
    spyOn.mockImplementation(() => {
      throw new CreateAxiosErrorMock({
        response: {
          data: { msg: 'jwt expired' },
          status: 403,
        },
      });
    });

    render(
      <MockApp>
        <Dashboard />
      </MockApp>,
    );

    await waitByLoading();

    expect(Router.push).toHaveBeenCalledWith('/login');
    Router.push('');
  });
});
