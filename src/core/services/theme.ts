export const THEME = 'theme';

export const getTheme = (): string => {
  if (typeof window !== 'undefined') {
    const themeSelected = localStorage.getItem(THEME) || '';
    return themeSelected;
  }
  return '';
};

export const changeTheme = (theme: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME, theme);
  }
};
