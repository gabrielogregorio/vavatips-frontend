import { ReactNode } from 'react';

export const ItemList = ({ children }: { children: ReactNode }) => (
  <p className="dark:text-skin-white text-skin-gray-500">{children}</p>
);
