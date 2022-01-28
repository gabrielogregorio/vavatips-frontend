export const TOKEN_JWT = 'app-token-valorant';

export const isAuthenticated = () =>
  localStorage.getItem(TOKEN_JWT) !== null && localStorage.getItem(TOKEN_JWT) !== undefined;
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_JWT);
  }
  return '';
};

export const login = (token: string) => {
  localStorage.setItem(TOKEN_JWT, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_JWT);
};
