import { ReactNode } from 'react';

type titleType = {
  children: ReactNode;
};

export const Title = ({ children }: titleType) => (
  <h1 className="text-xl text-center p-4 pl-0 pr-0 dark:text-skin-white text-gray-500">
    {children}
  </h1>
);
