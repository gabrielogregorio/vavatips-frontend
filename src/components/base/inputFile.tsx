import { ChangeEvent, ReactElement } from 'react';
import { GroupInput } from './groupInput';
import { inputStylesFromInput } from './input';
import { Label } from './label';

type inputFileType = {
  type: 'file';
  text: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  status?: string;
};

export const InputFile = ({ type, text, onChange, name, status }: inputFileType): ReactElement => {
  const getStyles = inputStylesFromInput(status);

  const disabled = status === 'disabled';
  return (
    <GroupInput>
      <Label name={name} text={text} className={getStyles} />
      <input
        className={` resize-none w-full px-3 py-2 focus:shadow-sm top-0 left-0 border bg-transparent outline-none rounded-md text-xs dark:text-gray-100 ${getStyles} ${
          disabled ? 'bg-gray-50' : ''
        }`}
        id={name}
        disabled={disabled}
        type={type}
        placeholder={text}
        onChange={(event): void => onChange(event)}
      />
    </GroupInput>
  );
};

InputFile.defaultProps = {
  status: '',
};
