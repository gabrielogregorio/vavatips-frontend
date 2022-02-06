export const THEME = 'theme';

export const getTheme = (): string => {
  const themeSelected = localStorage.getItem(THEME) || 'dark';
  return themeSelected;
};

export const changeTheme = (theme: string) => {
  localStorage.setItem(THEME, theme);
};
