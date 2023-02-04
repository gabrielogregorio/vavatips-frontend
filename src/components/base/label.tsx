import { ReactElement } from 'react';

type labelType = {
  name: string;
  text: string;
  className?: string[];
};

export const Label = ({ name, text, className }: labelType): ReactElement => {
  const classString = className.join(' ');

  return (
    <label className={`text-xs uppercase mb-1 ${classString} `} htmlFor={name}>
      {text}
    </label>
  );
};

Label.defaultProps = {
  className: [],
};
