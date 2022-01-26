import { getToken, isAuthenticated, login, logout } from '../../core/services/auth';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('auth', () => {
  it('should test auth localstorage', async () => {
    expect(isAuthenticated()).toEqual(false);
    login('VALUE_TOKEN_JWT');

    expect(isAuthenticated()).toEqual(true);
    expect(getToken()).toEqual('VALUE_TOKEN_JWT');

    logout();
    expect(isAuthenticated()).toEqual(false);

    expect(getToken()).toEqual(null);
  });
});
