import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { MockApp } from '@/mock/App.Mock';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import Register from '@/pages/register';
import {
  BAD_REQUEST_HTTP_CODE,
  ERROR_CONFLICT_HTTP_CODE,
  ERROR_IN_SERVER_HTTP_CODE,
  ERROR_NOT_ACCESS_HTTP_CODE,
  SUCCESS_HTTP_CODE,
} from '@/utils/statusCode';
import { Api } from '@/services/api';
import { CreateAxiosErrorMock, createResponseMock } from '@/mock/createResponseMock';

const mock = {
  passwordToCreated: 'passwordConfirm',
  passwordValid: 'testPassword',
  userNameToCreatedWithNotExists: 'usernameTestIfNotExists',
  usernameToCreated: 'usernameTest',
  usernameValid: 'testUsername',
  validCodeToCreated: 'codCadaster',
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

const spyOn = jest.spyOn(Api, 'post');

spyOn.mockImplementation((url, payload) => {
  const validCode = 'codeCadasterValid';
  const { username, password, code } = payload;
  const codIsInvalid = code !== validCode;
  const forceError500 = username === 'forceError500';
  const userExists = username === 'userIfExists';

  if (forceError500) {
    return Promise.reject(new CreateAxiosErrorMock({ response: { status: ERROR_IN_SERVER_HTTP_CODE, data: '' } }));
  }

  if (userExists) {
    return Promise.reject(
      new CreateAxiosErrorMock({
        response: { status: ERROR_CONFLICT_HTTP_CODE, data: { error: 'Username já está cadastrado!' } },
      }),
    );
  }

  if (codIsInvalid) {
    return Promise.reject(
      new CreateAxiosErrorMock({
        response: { status: ERROR_NOT_ACCESS_HTTP_CODE, data: { msg: 'invalid code' } },
      }),
    );
  }

  if (
    username === undefined ||
    username === null ||
    username === '' ||
    password === undefined ||
    password === null ||
    password === ''
  ) {
    return Promise.reject(
      new CreateAxiosErrorMock({
        response: { status: BAD_REQUEST_HTTP_CODE, data: {} },
      }),
    );
  }

  if (username === 'usernameTest' && password === 'passwordConfirm' && code === 'codeCadasterValid') {
    return Promise.resolve(
      createResponseMock(
        {
          id: '1234567890',
          image: '',
          username,
        },
        SUCCESS_HTTP_CODE,
      ),
    );
  }

  return Promise.reject(
    new CreateAxiosErrorMock({
      response: { status: ERROR_IN_SERVER_HTTP_CODE, data: {} },
    }),
  );
});

describe('<Register />', () => {
  it('should render cadaster screen and cadaster', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    const NON_CALLED = 0;
    expect(Router.push).toHaveBeenCalledTimes(NON_CALLED);

    await userEvent.type(screen.getByLabelText('Código'), 'codeCadasterValid');
    await userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    await userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    await userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirm');

    const inputCod: HTMLInputElement = screen.getByLabelText('Código');
    const inputUser: HTMLInputElement = screen.getByLabelText('Usuário');
    const inputPassword: HTMLInputElement = screen.getByLabelText('Senha');
    const inputConfirmPassword: HTMLInputElement = screen.getByLabelText(confirmYourPassword);

    expect(inputCod.value).toEqual('codeCadasterValid');
    expect(inputUser.value).toEqual(mock.usernameToCreated);
    expect(inputPassword.value).toEqual('passwordConfirm');
    expect(inputConfirmPassword.value).toEqual('passwordConfirm');

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

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

    await userEvent.type(screen.getByLabelText('Código'), 'userIfExists');
    await userEvent.type(screen.getByLabelText('Usuário'), 'userIfExists');
    await userEvent.type(screen.getByLabelText('Senha'), 'userIfExists');
    await userEvent.type(screen.getByLabelText(confirmYourPassword), 'userIfExists');

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

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

    await userEvent.type(screen.getByLabelText('Código'), 'forceError500');
    await userEvent.type(screen.getByLabelText('Usuário'), 'forceError500');
    await userEvent.type(screen.getByLabelText('Senha'), 'forceError500');
    await userEvent.type(screen.getByLabelText(confirmYourPassword), 'forceError500');

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitByLoading();
    expect(screen.getByText(/Erro ao cadastrar usuário/i)).toBeDefined();
  });

  it('should render cadaster, try cadaster with invalid code', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText('Código'), 'codeCadasterInvalidValid');
    await userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    await userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    await userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirm');

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitByLoading();

    expect(screen.getByText('Erro ao cadastrar usuário')).toBeDefined();
  });

  it('should render error if password dont match', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText('Código'), 'codeCadasterValid');
    await userEvent.type(screen.getByLabelText('Usuário'), mock.usernameToCreated);
    await userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    await userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirmDeferent');

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await screen.findByText(/Senhas não combinam/i);
  });

  it('should render error if cadaster in blank inputs', async () => {
    render(
      <MockApp>
        <Register />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText('Código'), 'codeCadasterValid');

    await userEvent.type(screen.getByLabelText('Senha'), 'passwordConfirm');
    await userEvent.type(screen.getByLabelText(confirmYourPassword), 'passwordConfirmDeferent');

    await userEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await screen.findByText(/Digite um usuário!/i);
  });
});
