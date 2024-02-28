import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import Profile from '@/pages/admin/profile';
import { login } from '@/services/auth';
import { MockApp } from '@/mock/App.Mock';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { ERROR_NOT_ACCESS_HTTP_CODE } from '@/utils/statusCode';
import { Api } from '@/services/api';
import { CreateAxiosErrorMock, createResponseMock } from '@/mock/createResponseMock';

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

const spyon = jest.spyOn(Api, 'get');

spyon.mockImplementation((url, headers) => {
  if (headers.authorization === 'Bearer VALUE_TOKEN_JWT') {
    return createResponseMock(
      {
        id: 'idUsername',
        image: 'imageUsername',
        username: 'usernameUsername',
      },
      200,
    );
  }
  return Promise.reject(
    new CreateAxiosErrorMock({ message: '', response: { data: '', status: ERROR_NOT_ACCESS_HTTP_CODE } }),
  );
});

describe('<Profile />', () => {
  it.skip('should render profile screen', async () => {
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

  it.skip('should logout screen', async () => {
    render(
      <MockApp>
        <Profile />
      </MockApp>,
    );
    login('VALUE_TOKEN_JWT');
    await waitByLoading();

    await userEvent.click(screen.getByRole('button', { name: 'logoff' }));

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

    await userEvent.type(screen.getByLabelText('Trocar nome de usuário'), 'newUsername');
    await userEvent.type(screen.getByLabelText('Digite uma nova senha'), 'newPassword');
    await userEvent.type(screen.getByLabelText('Confirme a nova senha'), 'newPassword');

    // await userEvent.click(screen.getByRole('button', { name: 'Atualizar dados' }));
  });
});
