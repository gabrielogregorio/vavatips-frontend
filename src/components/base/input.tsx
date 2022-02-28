import { ChangeEvent } from 'react';
import GroupInput from './groupInput';
import Label from './label';

type setValueType = (a: string) => void;
export interface PropsInterfaceInput {
  text: string;
  value: string;
  type: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
  setValue: setValueType;
  name: string;
}

const Input = ({ disabled, type, value, text, setValue, name }: PropsInterfaceInput) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  return (
    <GroupInput>
      <Label name={name} text={text} />
      <input
        className="w-full p-1.5 border-2 border-skin-primary-light dark:bg-skin-gray-900 bg-skin-gray-300 outline-none rounded-lg resize-none dark:text-skin-white text-skin-gray-500"
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
Input.defaultProps = {
  disabled: false,
};

export default Input;
