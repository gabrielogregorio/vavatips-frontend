import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { TOKEN_JWT } from '@/services/auth';
import MockApp from '@/mock/App.Mock';
import Login from '@/pages/login';
import { URL_POST_AUTHENTICATED } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode } from 'react';
import { ERROR_NOT_ACCESS_HTTP_CODE, ERROR_NOT_FOUND_HTTP_CODE, SUCCESS_HTTP_CODE } from '@/utils/statusCode';

const mock = {
  usernameValid: 'testUsername',
  passwordValid: 'testPassword',
  usernameToCreated: 'usernameTest',
  passwordToCreated: 'passwordConfirm',
  validCodeToCreated: 'codCadaster',
  userNameToCreatedWithNotExists: 'usernameTestIfNotExists',
};

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);

const handlers = [
  rest.post(URL_POST_AUTHENTICATED, async (req, res, ctx) => {
    const { username, password } = req.body as ParsedUrlQuery;

    if (username === 'forceError500') {
      return res(ctx.status(500));
    }
    if (username !== mock.usernameValid) {
      return res(ctx.status(ERROR_NOT_FOUND_HTTP_CODE));
    }

    if (password !== mock.passwordValid) {
      return res(ctx.status(ERROR_NOT_ACCESS_HTTP_CODE));
    }

    return res(
      ctx.status(SUCCESS_HTTP_CODE),
      ctx.json({
        token: 'tokenJwtTest',
        id: 'idUserNameTest',
      }),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Login />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render login screen', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    expect(localStorage.getItem(TOKEN_JWT)).toBeNull();

    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameValid);
    userEvent.type(screen.getByLabelText('Senha'), mock.passwordValid);

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(localStorage.getItem(TOKEN_JWT)).toEqual('tokenJwtTest');

    expect(Router.push).toHaveBeenCalledWith('/admin/dashboard');
    Router.push('');
  });

  it('should block login by username wrong', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Usuário'), 'username with not exists');
    userEvent.type(screen.getByLabelText('Senha'), 'wrong password');

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(screen.getByText('Usuário não cadastrado!')).toBeDefined();
  });

  it('should error 500, forced', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Usuário'), 'forceError500');
    userEvent.type(screen.getByLabelText('Senha'), 'forceError500');

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(screen.getByText('Erro Desconhecido')).toBeDefined();
  });

  it('should block login by password wrong', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameValid);
    userEvent.type(screen.getByLabelText('Senha'), 'password invalid');

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(screen.getByText('Senha inválida!')).toBeDefined();
  });

  it('should alternate screen cadaster and login', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.click(screen.getByText(/Fazer cadastro/i));
    expect(screen.getByText(/Fazer cadastro/i)).toHaveAttribute('href', '#/');
  });
});
