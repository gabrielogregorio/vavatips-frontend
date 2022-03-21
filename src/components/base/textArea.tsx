import { GroupInput } from '@/base/groupInput';
import { Label } from '@/base/label';
import { getStylesFromInput, styleLiteral, typeInputColors } from './input';

export type IPropsTextArea = {
  name: string;
  title: string;
  register: any;
  errors: any;
  status?: typeInputColors;
  disabled?: boolean;
};

export const TextArea = ({ title, register, errors, name, status, disabled }: IPropsTextArea) => {
  let getStyles = disabled ? styleLiteral.default : getStylesFromInput(status);
  const errorMessages = errors?.[name]?.message ?? '';
  const hasError = !!(errors && errorMessages);

  getStyles = hasError ? styleLiteral.invalid : getStyles;
  return (
    <GroupInput>
      <Label name={name} text={title} aria-label="Escolha uma descrição" className={[getStyles]} />

      <textarea
        {...(register && register(name))}
        className={` resize-none w-full px-3 py-2 pr-12 focus:shadow-sm top-0 left-0 border bg-transparent outline-none rounded-md text-xs dark:text-gray-100 ${getStyles} ${
          disabled ? 'bg-gray-50' : ''
        }`}
        id={name}
      />

      {hasError ? (
        <div role="alert" className={`text-xs mt-1 ${getStyles}`}>
          {errorMessages}
        </div>
      ) : null}
    </GroupInput>
  );
};

TextArea.defaultProps = {
  status: '',
  disabled: false,
};
