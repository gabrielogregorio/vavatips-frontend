import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/theme';
import { getTheme } from '@/services/theme';

export default function LayoutComponent({ children }: any) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(getTheme());
  }, [setTheme]);

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="flex  items-center min-h-screen flex-col p-0 w-full bg-skin-bgPage ">
        {children}
      </div>
    </div>
  );
}
