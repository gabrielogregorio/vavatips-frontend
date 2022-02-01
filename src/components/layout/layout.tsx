import { useEffect } from 'react';
import { useTheme } from '../../core/contexts/theme';
import { getTheme } from '../../core/services/theme';

export default function LayoutComponent({ children }: any) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setTheme(getTheme() || 'dark');
    }
  }, [typeof localStorage]);

  return <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>{children}</div>;
}
