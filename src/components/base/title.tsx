import { ReactNode } from 'react';

type titleType = {
  children: ReactNode;
};

const Title = ({ children }: titleType) => (
  <h1 className="text-2xl text-center p-7 pl-0 pr-0 dark:text-skin-gray-400 text-skin-gray-800">
    {children}
  </h1>
);
export default Title;
