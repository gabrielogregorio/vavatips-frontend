import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Router from 'next/router';
import DashboardScreen from '../../pages/admin/dashboard';

// FIXME: test JWT token

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { map: 'Ascent32' },
      asPath: '',
    };
  },
}));

jest.mock(
  'next/link',
  () =>
    function LinkComponent({ children }: any) {
      return children;
    },
);

let tryNumbers = 0;

const handlers = [
  rest.get(`http://localhost/dashboard`, async (req, res, ctx) =>
    res(
      ctx.json({
        countAll: 134,
        countIps: 318,
        countAllPosts: 190,
        countAlMaps: 15,
        countAlAgents: 30,
        countAllSuggestions: 10,
        countAllUsers: 3,
      }),
    ),
  ),

  rest.get(`http://localhost/user`, async (req, res, ctx) => {
    if (tryNumbers === 1) {
      return res(ctx.status(403), ctx.json({ msg: 'jwt expired' }));
    }
    tryNumbers += 1;

    return res(
      ctx.json({
        id: '12345678',
        username: 'codigo limpo?',
        image: 'image.png',
      }),
    );
  }),
];

const server = setupServer(...handlers);

describe('<DashboardScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render dashboard', async () => {
    render(<DashboardScreen />);

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

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
    render(<DashboardScreen />);

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    expect(Router.push).toHaveBeenCalledWith('/login');
    Router.push('');
  });
});
