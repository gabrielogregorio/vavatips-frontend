import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import MockApp from '@/mock/App.Mock';
import { URL_POST_CREATE_NEW_USER } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode } from 'react';
import Register from '@/pages/register';
import {
  BAD_REQUEST_HTTP_CODE,
  ERROR_CONFLICT_HTTP_CODE,
  ERROR_IN_SERVER_HTTP_CODE,
  ERROR_NOT_ACCESS_HTTP_CODE,
  SUCCESS_HTTP_CODE,
} from '@/utils/statusCode';

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

const confirmYourPassword = 'Confirme uma senha';

const handlers = [
  rest.post(URL_POST_CREATE_NEW_USER, async (req, res, ctx) => {
    const validCode = 'codeCadasterValid';
    const { username, password, code } = req.body as ParsedUrlQuery;
    const codIsInvalid = code !== validCode;
    const forceError500 = username === 'forceError500';
    const userExists = username === 'userIfExists';

    if (forceError500) {
      return res(ctx.status(ERROR_IN_SERVER_HTTP_CODE));
    }

    if (userExists) {
      return res(ctx.status(ERROR_CONFLICT_HTTP_CODE), ctx.json({ error: 'Username já está cadastrado!' }));
    }

    if (codIsInvalid) {
      return res(ctx.status(ERROR_NOT_ACCESS_HTTP_CODE), ctx.json({ msg: 'invalid code' }));
    }

    if (
      username === undefined ||
      username === null ||
      username === '' ||
      password === undefined ||
      password === null ||
      password === ''
    ) {
      return res(ctx.status(BAD_REQUEST_HTTP_CODE));
    }

    if (username === 'usernameTest' && password === 'passwordConfirm' && code === 'codeCadasterValid') {
      return res(
        ctx.status(SUCCESS_HTTP_CODE),
        ctx.json({
          id: '1234567890',
          username,
          image: '',
        }),
      );
    }

    return res(ctx.status(ERROR_IN_SERVER_HTTP_CODE));
  }),
];

const server = setupServer(...handlers);

describe('<Register />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render cadaster screen and cadaster', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    const NON_CALLED = 0;
    expect(Router.push).toHaveBeenCalledTimes(NON_CALLED);

    userEvent.type(screen.getByLabelText('Código'), 'codeCadasterValid');
    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirm');

    const inputCod: HTMLInputElement = screen.getByLabelText('Código');
    const inputUser: HTMLInputElement = screen.getByLabelText('Usuário');
    const inputPassword: HTMLInputElement = screen.getByLabelText('Senha');
    const inputConfirmPassword: HTMLInputElement = screen.getByLabelText(confirmYourPassword);

    expect(inputCod.value).toEqual('codeCadasterValid');
    expect(inputUser.value).toEqual(mock.usernameToCreated);
    expect(inputPassword.value).toEqual('passwordConfirm');
    expect(inputConfirmPassword.value).toEqual('passwordConfirm');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitByLoading();

    expect(Router.push).toHaveBeenCalledWith('/login');
    Router.push('');
  });

  it('should try cadaster user and return 409, but user exists!', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    expect(Router.push).toHaveBeenCalledWith('');

    userEvent.type(screen.getByLabelText('Código'), 'userIfExists');
    userEvent.type(screen.getByLabelText('Usuário'), 'userIfExists');
    userEvent.type(screen.getByLabelText('Senha'), 'userIfExists');
    userEvent.type(screen.getByLabelText(confirmYourPassword), 'userIfExists');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitByLoading();
    expect(screen.getByText('Esse e-mail já está cadastrado')).toBeDefined();
  });

  it('should cadaster user and return 500', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    expect(Router.push).toHaveBeenCalledWith('');

    userEvent.type(screen.getByLabelText('Código'), 'forceError500');
    userEvent.type(screen.getByLabelText('Usuário'), 'forceError500');
    userEvent.type(screen.getByLabelText('Senha'), 'forceError500');
    userEvent.type(screen.getByLabelText(confirmYourPassword), 'forceError500');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitByLoading();
    expect(screen.getByText(/Erro ao cadastrar usuário/i)).toBeDefined();
  });

  it('should render cadaster, try cadaster with invalid code', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Código'), 'codeCadasterInvalidValid');
    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirm');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitByLoading();

    expect(screen.getByText('Erro ao cadastrar usuário')).toBeDefined();
  });

  it('should render error if password dont match', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Código'), 'codeCadasterValid');
    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirmDeferent');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await screen.findByText(/Senhas não combinam/i);
  });

  it('should render error if cadaster in blank inputs', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    userEvent.type(screen.getByLabelText('Código'), 'codeCadasterValid');

    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirmDeferent');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await screen.findByText(/Digite um usuário!/i);
  });
});
