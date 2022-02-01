import { createContext, useContext, useEffect, useState } from 'react';
import { changeTheme, getTheme } from '../services/theme';

export const initializeTheme: string = getTheme();

// eslint-disable-next-line no-unused-vars
const ContextTheme = createContext<{ theme: string; setTheme: (event: any) => void }>({
  theme: initializeTheme,
  setTheme: null,
});

export const useTheme = () => useContext(ContextTheme);

export default function ContextThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<string>('dark');
  useEffect(() => {
    if (theme) {
      changeTheme(theme);
    }
  }, [theme]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ContextTheme.Provider value={{ theme, setTheme }}>{children}</ContextTheme.Provider>;
}
