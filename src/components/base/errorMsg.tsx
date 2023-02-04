import { ReactElement } from 'react';

type propsType = {
  msg: string;
};

export const ErrorMsg = ({ msg }: propsType): ReactElement => (
  <p className="p-0 m-0 w-full text-center text-skin-secondary-regular text-sm">{msg}</p>
);
