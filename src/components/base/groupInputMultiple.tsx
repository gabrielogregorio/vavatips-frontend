import { ReactNode } from 'react';

type groupInputMultipleType = {
  children: ReactNode;
};

const GroupInputMultiple = ({ children }: groupInputMultipleType) => (
  <div className="flex justify-between w-full gap-4">{children}</div>
);
export default GroupInputMultiple;
