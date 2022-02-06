import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/theme';

export default function LayoutComponent({ children }: any) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setTheme('dark');
    }
  }, [setTheme]);

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="flex  items-center min-h-screen flex-col p-0 w-full bg-skin-bgPrimary ">
        {children}
      </div>
    </div>
  );
}
