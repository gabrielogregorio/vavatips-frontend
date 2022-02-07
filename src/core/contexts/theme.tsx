import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { changeTheme } from '@/services/theme';

const initializeTheme: string = 'dark';

const ContextTheme = createContext<{ theme: string; setTheme: (event: any) => void }>({
  theme: initializeTheme,
  setTheme: null,
});

export default function ContextThemeProvider({ children }: any) {
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
