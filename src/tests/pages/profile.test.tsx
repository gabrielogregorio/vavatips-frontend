import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Router from 'next/router';
import Profile from '@/pages/admin/profile';
import { login } from '@/services/auth';
import { MockApp } from '@/mock/App.Mock';
import { URL_GET_YOUR_USER } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { ERROR_NOT_ACCESS_HTTP_CODE } from '@/utils/statusCode';

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

const handlers = [
  rest.get(URL_GET_YOUR_USER, async (req, res, ctx) => {
    if (req.headers.get('authorization') === 'Bearer VALUE_TOKEN_JWT') {
      return res(
        ctx.json({
          id: 'idUsername',
          image: 'imageUsername',
          username: 'usernameUsername',
        }),
      );
    }
    return res(ctx.status(ERROR_NOT_ACCESS_HTTP_CODE));
  }),
];

const server = setupServer(...handlers);

describe('<Profile />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render profile screen', async () => {
    render(
      <MockApp>
        <Profile />
      </MockApp>,
    );
    login('VALUE_TOKEN_JWT');

    await waitByLoading();

    const inputUsername: HTMLInputElement = screen.getByLabelText('Trocar nome de usuário');
    expect(inputUsername.value).toEqual('usernameUsername');
  });

  it('should logout screen', async () => {
    render(
      <MockApp>
        <Profile />
      </MockApp>,
    );
    login('VALUE_TOKEN_JWT');
    await waitByLoading();

    userEvent.click(screen.getByRole('button', { name: 'logoff' }));

    expect(Router.push).toHaveBeenCalledWith('/login');
    Router.push('');
  });

  it('should edit user and save', async () => {
    render(
      <MockApp>
        <Profile />
      </MockApp>,
    );
    login('VALUE_TOKEN_JWT');
    await waitByLoading();

    userEvent.type(screen.getByLabelText('Trocar nome de usuário'), 'newUsername');
    userEvent.type(screen.getByLabelText('Digite uma nova senha'), 'newPassword');
    userEvent.type(screen.getByLabelText('Confirme a nova senha'), 'newPassword');

    // userEvent.click(screen.getByRole('button', { name: 'Atualizar dados' }));
  });
});
