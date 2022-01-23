/* eslint-disable no-unused-vars */
type typeInput = 'text' | 'password' | 'email';

export interface propsInterfaceInput {
  text: string;
  value: string;
  type: typeInput;
  disabled?: boolean;
  setValue: (value: string) => any;
  name: string;
}
