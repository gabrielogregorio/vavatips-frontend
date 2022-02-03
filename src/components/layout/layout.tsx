import { useEffect } from 'react';
import { useTheme } from '../../core/contexts/theme';

export default function LayoutComponent({ children }: any) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setTheme('dark');
    }
  }, [typeof localStorage]);

  return <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>{children}</div>;
}
