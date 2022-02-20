import { ReactNode } from 'react';

const ItemList = ({ children }: { children: ReactNode }) => (
  <p className="dark:text-skin-white text-skin-gray-500">{children}</p>
);

export default ItemList;
