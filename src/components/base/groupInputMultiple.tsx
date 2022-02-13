import { ReactNode } from 'react';

type groupInputMultipleType = {
  children: ReactNode;
};

export default function GroupInputMultiple({ children }: groupInputMultipleType) {
  return <div className="flex justify-between w-full gap-4">{children}</div>;
}
