import { ReactNode } from 'react';

export const Table = ({ children }: { children: ReactNode }) => (
  <table className="w-full max-w-maxWidthDefault">{children}</table>
);

export const Thead = ({ children }: { children: ReactNode }) => (
  <thead className="border-b">{children}</thead>
);

export const Tbody = ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>;
type trType = {
  children: ReactNode;
  keyItem: number | string;
};

export const Tr = ({ children, keyItem }: trType) => (
  <tr key={keyItem} className="border-b">
    {children}
  </tr>
);

export const Th = ({ children }: { children: ReactNode }) => (
  <th className="text-base text-skin-white text-left">{children}</th>
);

export const Td = ({ children }: { children: ReactNode }) => (
  <td className="px-5 pl-0 break-all text-base dark:text-skin-white text-skin-gray-500 text-left">
    {children}
  </td>
);
