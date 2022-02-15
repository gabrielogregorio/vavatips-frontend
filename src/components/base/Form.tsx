import { ReactNode } from 'react';

type formComponentType = {
  children: ReactNode;
};

const FormComponent = ({ children }: formComponentType) => (
  <div className="flex flex-col items-center w-full max-w-maxWidthDefaultForm">{children}</div>
);
export default FormComponent;
