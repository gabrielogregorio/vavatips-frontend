import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import MockApp from '../core/App.Mock';
import Login from '../../pages/login';
import { TOKEN_JWT } from '../../core/services/auth';

const mock = {
  usernameValid: 'my username',
  passwordValid: 'my password',

  usernameToCreated: 'usernameTest',
  passwordToCreated: 'passwordConfirm',
  validCodeToCreated: 'codCadaster',

  userNameToCreatedWithNotExists: 'usernameTestIfNotExists',
};

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const handlers = [
  rest.post(`http://127.0.0.1:3333/auth`, async (req, res, ctx) => {
    const { username, password }: any = req.body;

    if (username === 'forceError500') {
      return res(ctx.status(500));
    }
    if (username !== mock.usernameValid) {
      return res(ctx.status(404));
    }

    if (password !== mock.passwordValid) {
      return res(ctx.status(403));
    }

    return res(
      ctx.status(200),
      ctx.json({
        token: 'tokenJwtTest',
        id: 'idUserNameTest',
      }),
    );
  }),

  rest.post(`http://127.0.0.1:3333/user`, async (req, res, ctx) => {
    const validCode = 'codeCadasterValid';
    const { username, password, code }: any = req.body;
    const codIsInvalid = code !== validCode;

    if (username === 'forceError500') {
      return res(ctx.status(500));
    }

    if (username === 'userIfExists') {
      return res(ctx.status(409), ctx.json({ error: 'Username já está cadastrado!' }));
    }

    if (codIsInvalid) {
      return res(ctx.status(403), ctx.json({ msg: 'invalid code' }));
    }

    if (
      username === undefined ||
      username === null ||
      username === '' ||
      password === undefined ||
      password === null ||
      password === ''
    ) {
      return res(ctx.status(400));
    }

    if (username === mock.usernameToCreated && password === 'passwordConfirm' && code === 'codCadaster') {
      return res(
        ctx.status(200),
        ctx.json({
          id: '1234567890',
          username,
          image: '',
        }),
      );
    }

    return res(ctx.status(500));
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

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });

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
    userEvent.type(screen.getByLabelText('Senha'), 'any password');

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });

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

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });

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

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });

    expect(screen.getByText('Senha inválida!')).toBeDefined();
  });

  it('should alternate screen cadaster and login', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Fazer Cadastro' }));
    userEvent.click(screen.getByRole('button', { name: 'Fazer Login' }));
  });

  it('should render cadaster screen and cadaster', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    expect(Router.push).toHaveBeenCalledWith('');
    userEvent.click(screen.getByRole('button', { name: 'Fazer Cadastro' }));

    userEvent.type(screen.getByLabelText('Código de cadastro'), 'codeCadasterValid');
    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText('Confirme uma senha'), 'passwordConfirm');

    const inputCod: HTMLInputElement = screen.getByLabelText('Código de cadastro');
    const inputUser: HTMLInputElement = screen.getByLabelText('Usuário');
    const inputPassword: HTMLInputElement = screen.getByLabelText('Senha');
    const inputConfirmPassword: HTMLInputElement = screen.getByLabelText('Confirme uma senha');

    expect(inputCod.value).toEqual('codeCadasterValid');
    expect(inputUser.value).toEqual(mock.usernameToCreated);
    expect(inputPassword.value).toEqual('passwordConfirm');
    expect(inputConfirmPassword.value).toEqual('passwordConfirm');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });

    expect(Router.push).toHaveBeenCalledWith('/admin/dashboard');
    Router.push('');
  });

  it('should try cadaster user and return 409, but user exists!', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    expect(Router.push).toHaveBeenCalledWith('');

    userEvent.click(screen.getByRole('button', { name: 'Fazer Cadastro' }));

    userEvent.type(screen.getByLabelText('Código de cadastro'), 'userIfExists');
    userEvent.type(screen.getByLabelText('Usuário'), 'userIfExists');
    userEvent.type(screen.getByLabelText('Senha'), 'userIfExists');
    userEvent.type(screen.getByLabelText('Confirme uma senha'), 'userIfExists');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });
    expect(screen.getByText('Esse e-mail já está cadastrado')).toBeDefined();
  });

  it('should cadaster user and return 500', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    expect(Router.push).toHaveBeenCalledWith('');

    userEvent.click(screen.getByRole('button', { name: 'Fazer Cadastro' }));

    userEvent.type(screen.getByLabelText('Código de cadastro'), 'forceError500');
    userEvent.type(screen.getByLabelText('Usuário'), 'forceError500');
    userEvent.type(screen.getByLabelText('Senha'), 'forceError500');
    userEvent.type(screen.getByLabelText('Confirme uma senha'), 'forceError500');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });
    expect(screen.getByText(/Erro ao cadastrar usuário/i)).toBeDefined();
  });

  it('should render cadaster, try cadaster with invalid code', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Fazer Cadastro' }));

    userEvent.type(screen.getByLabelText('Código de cadastro'), 'codeCadasterInvalidValid');
    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText('Confirme uma senha'), 'passwordConfirm');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitForElementToBeRemoved(screen.queryByTestId('loader'), {
      timeout: 2000,
    });

    expect(screen.getByText('Erro ao cadastrar usuário')).toBeDefined();
  });

  it('should render error if password dont match', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Fazer Cadastro' }));

    userEvent.type(screen.getByLabelText('Código de cadastro'), 'codeCadasterValid');
    userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText('Confirme uma senha'), 'passwordConfirmDeferent');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(screen.getByText('As senhas não combinam!')).toBeDefined();
  });

  it('should render error if cadaster in blank inputs', async () => {
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Fazer Cadastro' }));

    userEvent.type(screen.getByLabelText('Código de cadastro'), 'codeCadasterValid');

    userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    userEvent.type(screen.getByLabelText('Confirme uma senha'), 'passwordConfirmDeferent');

    userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    expect(screen.getByText('Você precisa preencher todos os campos')).toBeDefined();
  });
});
