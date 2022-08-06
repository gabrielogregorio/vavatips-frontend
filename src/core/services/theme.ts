const THEME = 'theme';

export const getTheme = (): string => localStorage.getItem(THEME) || 'dark';

export const changeTheme = (theme: string) => {
  localStorage.setItem(THEME, theme);
};
