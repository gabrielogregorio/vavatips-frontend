import { ReactNode } from 'react';
import Button from './button';

type ButtonType = {
  children: ReactNode;
  className: string;
  onClick: () => void;
};

const ButtonForm = ({ children, className, onClick }: ButtonType) => (
  <Button className={`w-full border-2 rounded-xl ${className}`} onClick={onClick}>
    {children}
  </Button>
);

export default ButtonForm;
