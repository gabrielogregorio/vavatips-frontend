import { ReactNode } from 'react';

type subContainerType = {
  children: ReactNode;
};

const SubContainer = ({ children }: subContainerType) => (
  <div className="max-w-maxWidthDefault flex items-center flex-col w-full h-full bg-skin-white dark:bg-skin-gray-900 shadow-md p-4 m-8">
    {children}
  </div>
);
export default SubContainer;
