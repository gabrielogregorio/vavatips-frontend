import { ReactNode } from 'react';

type formType = {
  children: ReactNode;
  onSubmit: Function;
};

export const Form = ({ children, onSubmit }: formType) => (
  <form onSubmit={(event) => onSubmit(event)} className="flex flex-col items-center w-full max-w-maxWidthDefaultForm">
    {children}
  </form>
);
