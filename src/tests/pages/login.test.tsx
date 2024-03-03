import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { TOKEN_JWT } from '@/services/auth';
import { MockApp } from '@/mock/App.Mock';
import Login from '@/pages/login';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
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

const spyOn = jest.spyOn(Api, 'post');

describe('<Login />', () => {
  it('should render login screen', async () => {
    spyOn.mockImplementation(() =>
      createResponseMock(
        {
          id: 'idUserNameTest',
          token: 'tokenJwtTest',
        },
        200,
      ),
    );

    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    expect(localStorage.getItem(TOKEN_JWT)).toBeNull();

    await userEvent.type(screen.getByLabelText('Usuário'), mock.usernameValid);
    await userEvent.type(screen.getByLabelText('Senha'), mock.passwordValid);

    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(localStorage.getItem(TOKEN_JWT)).toEqual('tokenJwtTest');

    expect(Router.push).toHaveBeenCalledWith('/admin/dashboard');
    Router.push('');
  });

  it('should block login by username wrong', async () => {
    spyOn.mockImplementation(() => {
      throw new CreateAxiosErrorMock({
        response: {
          data: {},
          status: 404,
        },
      });
    });
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText('Usuário'), 'username with not exists');
    await userEvent.type(screen.getByLabelText('Senha'), 'wrong password');

    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(screen.getByText('Usuário não cadastrado!')).toBeDefined();
  });

  it('should error 500, forced', async () => {
    spyOn.mockImplementation(() => {
      throw new CreateAxiosErrorMock({
        response: {
          data: {},
          status: 500,
        },
      });
    });
    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText('Usuário'), 'forceError500');
    await userEvent.type(screen.getByLabelText('Senha'), 'forceError500');

    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(screen.getByText('Erro Desconhecido')).toBeDefined();
  });

  it('should block login by password wrong', async () => {
    spyOn.mockImplementation(() => {
      throw new CreateAxiosErrorMock({
        response: {
          data: {},
          status: 403,
        },
      });
    });

    render(
      <MockApp>
        <Login />
      </MockApp>,
    );

    await userEvent.type(screen.getByLabelText('Usuário'), mock.usernameValid);
    await userEvent.type(screen.getByLabelText('Senha'), 'password invalid');

    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitByLoading();

    expect(screen.getByText('Senha inválida!')).toBeDefined();
  });
});
