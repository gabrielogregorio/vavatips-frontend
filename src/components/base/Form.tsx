import { ReactNode } from 'react';

type formComponentType = {
  children: ReactNode;
};

export default function FormComponent({ children }: formComponentType) {
  return (
    <div className="flex flex-col items-center w-full max-w-maxWidthDefaultForm">{children}</div>
  );
}
