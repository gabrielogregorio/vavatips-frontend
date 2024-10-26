import { GroupInput } from '@/base/groupInput';
import { Label } from '@/base/label';
import { ReactElement } from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { getStylesFromInput, styleLiteral, typeInputColors } from './input';

type IPropsTextArea = {
  disabled?: boolean;
  name: string;
  title: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors;
  status?: typeInputColors;
};

export const TextArea = ({ title, register, errors, name, status, disabled }: IPropsTextArea): ReactElement => {
  let getStyles = disabled ? styleLiteral.default : getStylesFromInput(status);
  const errorMessages = errors?.[name]?.message ?? '';
  const hasError = !!(errors && errorMessages);

  getStyles = hasError ? styleLiteral.invalid : getStyles;
  return (
    <GroupInput>
      <Label name={name} text={title} aria-label="Escolha uma descrição" className={getStyles} />

      <textarea
        {...register}
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
  disabled: false,
  status: '',
};
