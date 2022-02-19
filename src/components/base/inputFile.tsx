import { ChangeEvent } from 'react';
import GroupInput from './groupInput';
import LabelComponent from './label';

type inputFileType = {
  disabled: boolean;
  type: 'file';
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name;
};

const InputFile = ({ disabled, type, text, onChange, name }: inputFileType) => (
  <GroupInput>
    <LabelComponent name={name} text={text} />
    <input
      className="w-full p-1.5 border-2 border-skin-secondary dark:bg-skin-bgContainer bg-skin-bgPageWhite dark:text-skin-textColor text-skin-textColorGray outline-none rounded-lg resize-none"
      id={name}
      disabled={disabled}
      type={type}
      placeholder={text}
      onChange={(e) => onChange(e)}
    />
  </GroupInput>
);

export default InputFile;
