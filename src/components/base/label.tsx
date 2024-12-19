import { ReactElement } from 'react';

type labelType = {
  name: string;
  text: string;
  className?: string;
};

export const Label = ({ name, text, className = undefined }: labelType): ReactElement => (
  <label className={`text-xs uppercase mb-1 ${className} `} htmlFor={name}>
    {text}
  </label>
);
