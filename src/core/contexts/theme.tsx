import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { changeTheme } from '@/services/theme';

const initializeTheme: string = 'dark';

const ContextTheme = createContext<{ theme: string; setTheme: (newTheme: string) => void }>({
  setTheme: null,
  theme: initializeTheme,
});

type contextThemeProviderType = {
  children: ReactNode;
};

export const ContextThemeProvider = ({ children }: contextThemeProviderType) => {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    if (theme) {
      changeTheme(theme);
    }
  }, [theme]);

  const value = useMemo(() => ({ setTheme, theme }), [theme]);
  return <ContextTheme.Provider value={value}>{children}</ContextTheme.Provider>;
};

export const useTheme = () => useContext(ContextTheme);
