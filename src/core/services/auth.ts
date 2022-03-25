export const TOKEN_JWT = 'app-token-valorant';

export const isAuthenticated = () => {
  try {
    if (typeof window?.localStorage !== 'undefined') {
      return localStorage.getItem(TOKEN_JWT) !== null && localStorage.getItem(TOKEN_JWT) !== undefined;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const getToken = () => {
  try {
    if (typeof window?.localStorage !== 'undefined') {
      return localStorage.getItem(TOKEN_JWT);
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const login = (token: string) => {
  localStorage.setItem(TOKEN_JWT, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_JWT);
};
