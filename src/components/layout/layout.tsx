import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/contexts/theme';
import { getTheme } from '@/services/theme';

type layoutComponentType = {
  children: ReactNode;
};

const LayoutComponent = ({ children }: layoutComponentType) => {
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
};
export default LayoutComponent;
