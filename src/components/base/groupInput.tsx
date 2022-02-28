import { ReactNode } from 'react';

type groupInputType = {
  children: ReactNode;
};

export const GroupInput = ({ children }: groupInputType) => (
  <div className="flex justify-between w-full p-1 pl-0 pr-0">
    <div className="flex w-full flex-col">{children}</div>
  </div>
);
