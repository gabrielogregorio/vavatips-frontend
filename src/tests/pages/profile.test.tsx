import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Router from 'next/router';
import MyProfileScreen from '../../pages/admin/profile';
import { login } from '../../core/services/auth';
import MockApp from '../core/App.Mock';

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

const handlers = [
  rest.get(`http://127.0.0.1:3333/user`, async (req, res, ctx) => {
    if (req.headers.get('authorization') === 'Bearer VALUE_TOKEN_JWT') {
      return res(
        ctx.json({
          id: 'idUsername',
          username: 'usernameUsername',
          image: 'imageUsername',
        }),
      );
    }
    return res(ctx.status(403));
  }),
];

const server = setupServer(...handlers);

describe('<MyProfileScreen />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render profile screen', async () => {
    render(
      <MockApp>
        <MyProfileScreen />
      </MockApp>,
    );
    login('VALUE_TOKEN_JWT');

    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    const inputUsername: HTMLInputElement = screen.getByLabelText('Trocar nome de usuário');
    expect(inputUsername.value).toEqual('usernameUsername');
  });

  it('should logout screen', async () => {
    render(
      <MockApp>
        <MyProfileScreen />
      </MockApp>,
    );
    login('VALUE_TOKEN_JWT');
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    userEvent.click(screen.getByRole('button', { name: 'logoff' }));

    expect(Router.push).toHaveBeenCalledWith('/login');
    Router.push('');
  });

  it('should edit user and save', async () => {
    render(
      <MockApp>
        <MyProfileScreen />
      </MockApp>,
    );
    login('VALUE_TOKEN_JWT');
    await waitForElementToBeRemoved(screen.getByTestId(/loader/i), {
      timeout: 2000,
    });

    userEvent.type(screen.getByLabelText('Trocar nome de usuário'), 'newUsername');
    userEvent.type(screen.getByLabelText('Digite uma nova senha'), 'newPassword');
    userEvent.type(screen.getByLabelText('Confirme a nova senha'), 'newPassword');

    userEvent.click(screen.getByRole('button', { name: 'Atualizar dados' }));

    // FIXME: create feature
  });
});
