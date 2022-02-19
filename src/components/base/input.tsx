import { ChangeEvent } from 'react';
import GroupInput from './groupInput';
import LabelComponent from './label';

type setValueType = (a: string) => void;
export interface propsInterfaceInput {
  text: string;
  value: string;
  type: 'text' | 'password' | 'email';
  disabled?: boolean;
  setValue: setValueType;
  name: string;
}

const Input = ({ disabled, type, value, text, setValue, name }: propsInterfaceInput) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  return (
    <GroupInput>
      <LabelComponent name={name} text={text} />
      <input
        className="w-full p-1.5 border-2 border-skin-secondary dark:bg-skin-bgContainer bg-skin-bgPageWhite outline-none rounded-lg resize-none dark:text-skin-textColor text-skin-textColorGray"
        id={name}
        disabled={disabled}
        type={type}
        value={value}
        placeholder={text}
        onChange={(event) => handleInput(event)}
      />
    </GroupInput>
  );
};
export default Input;
