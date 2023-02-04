import { ReactElement, ReactNode } from 'react';

type groupInputMultipleType = {
  children: ReactNode;
};

export const GroupInputMultiple = ({ children }: groupInputMultipleType): ReactElement => (
  <div className="flex justify-between w-full gap-4">{children}</div>
);
