import { GroupInput } from '@/base/groupInput';
import { Label } from '@/base/label';
import { getStylesFromInput, styleLiteral, typeInputColors } from './input';

export type IPropsTextArea = {
  name: string;
  title: string;
  value: string;
  setValue: (value: string) => void;
  status?: typeInputColors;
  disabled?: boolean;
};

export const TextArea = ({ title, setValue, value, name, status, disabled }: IPropsTextArea) => {
  const getStyles = disabled ? styleLiteral.default : getStylesFromInput(status);

  return (
    <GroupInput>
      <Label name={name} text={title} aria-label="Escolha uma descrição" className={[getStyles]} />

      <textarea
        className={` resize-none w-full px-3 py-2 pr-12 focus:shadow-sm top-0 left-0 border bg-transparent outline-none rounded-md text-xs dark:text-gray-100 ${getStyles} ${
          disabled ? 'bg-gray-50' : ''
        }`}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </GroupInput>
  );
};

TextArea.defaultProps = {
  status: '',
  disabled: false,
};
