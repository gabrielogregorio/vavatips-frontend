import { ReactNode } from 'react';

type titleType = {
  children: ReactNode;
};

export default function Title({ children }: titleType) {
  return <h1 className="text-2xl text-center p-7 pl-0 pr-0 text-skin-textColor">{children}</h1>;
}
