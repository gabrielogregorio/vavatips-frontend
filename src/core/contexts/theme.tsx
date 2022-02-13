import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { changeTheme } from '@/services/theme';

const initializeTheme: string = 'dark';

const ContextTheme = createContext<{ theme: string; setTheme: (newTheme: string) => void }>({
  theme: initializeTheme,
  setTheme: null,
});

type contextThemeProviderType = {
  children: ReactNode;
};

export default function ContextThemeProvider({ children }: contextThemeProviderType) {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    if (theme) {
      changeTheme(theme);
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ContextTheme.Provider value={value}>{children}</ContextTheme.Provider>;
}

export const useTheme = () => useContext(ContextTheme);
