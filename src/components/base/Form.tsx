import { ReactNode } from 'react';

type formType = {
  children: ReactNode;
};

const Form = ({ children }: formType) => (
  <div className="flex flex-col items-center w-full max-w-maxWidthDefaultForm">{children}</div>
);
export default Form;
