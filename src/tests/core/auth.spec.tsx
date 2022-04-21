import { getToken, isAuthenticated, login, logout } from '@/services/auth';
import { defaultMockRouterType } from 'src/tests/components/managmentPost.spec';

jest.mock('next/router', () => ({
  useRouter(): defaultMockRouterType {
    return {
      route: '',
      pathname: '',
      query: '',
      asPath: '',
      isReady: true,
    };
  },
}));
Object.defineProperty(window, undefined, jest.fn());

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

  it('should test auth localstorage with simulate run in server', async () => {
    delete window.localStorage;
    expect(isAuthenticated()).toEqual(false);
    expect(getToken()).toEqual('');
  });
});
