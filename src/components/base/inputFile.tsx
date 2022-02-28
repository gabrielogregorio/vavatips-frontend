import { ChangeEvent } from 'react';
import { GroupInput } from './groupInput';
import { Label } from './label';

export type inputFileType = {
  disabled: boolean;
  type: 'file';
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name;
};

export const InputFile = ({ disabled, type, text, onChange, name }: inputFileType) => (
  <GroupInput>
    <Label name={name} text={text} />
    <input
      className="w-full p-1.5 border-2 border-skin-primary-light dark:bg-skin-gray-900 bg-skin-gray-300 dark:text-skin-white text-skin-gray-500 outline-none rounded-lg resize-none"
      id={name}
      disabled={disabled}
      type={type}
      placeholder={text}
      onChange={(e) => onChange(e)}
    />
  </GroupInput>
);
