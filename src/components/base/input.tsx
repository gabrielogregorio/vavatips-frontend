import { ChangeEvent, ReactNode, useState } from 'react';
import { AiFillWarning, AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import { GroupInput } from './groupInput';
import { Label } from './label';

export type typeInputColors = 'invalid' | 'valid' | 'warning' | 'default';

export const styleLiteral = {
  invalid: 'border-red-400 text-red-400 focus:shadow-red-400 ',
  valid: 'border-success text-success focus:shadow-success',
  warning: 'border-orange-400 text-orange-400 focus:shadow-orange-400 ',
  default: 'border-gray-400 text-gray-500 focus:border-blue-400 focus:shadow-blue-400 ',
};

export function getStylesFromInput(status) {
  return styleLiteral[status] ?? styleLiteral.default;
}

type setValueType = (a: string) => void;

export type TPropsInput = {
  text: string;
  value: string;
  type?: 'text' | 'password' | 'email' | 'number';
  setValue: setValueType;
  name: string;
  status?: typeInputColors;
  disabled?: boolean;
  message?: string;
};

type iconsFromInputType = {
  children: ReactNode;
  status: string;
  onClick?: Function;
};

const IconsFromInput = ({ children, status, onClick }: iconsFromInputType) => (
  <button
    type="button"
    onClick={() => onClick()}
    className={`cursor-pointer flex ${getStylesFromInput(status)}  `}>
    {children}
  </button>
);

IconsFromInput.defaultProps = {
  onClick: () => null,
};

export const Input = ({
  type,
  value,
  text,
  setValue,
  name,
  status,
  message,
  disabled,
}: TPropsInput) => {
  const [showEyeIcon, setShowEyeIcon] = useState<boolean>(false);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const togglePassword = () => {
    setShowEyeIcon((prev) => !prev);
  };

  function showIcon() {
    return showEyeIcon ? <AiFillEye /> : <AiTwotoneEyeInvisible />;
  }

  const displayEyeIcon = type === 'password';
  const displayTextIfForPassword = displayEyeIcon && showEyeIcon ? 'text' : type;

  const getStyles = disabled ? styleLiteral.default : getStylesFromInput(status);

  return (
    <GroupInput>
      <Label name={name} text={text} className={[getStyles]} />
      <div className="relative">
        <input
          className={`w-full px-3 py-2 pr-12 focus:shadow-sm top-0 left-0 border bg-transparent outline-none rounded-md text-xs dark:text-gray-100 ${getStyles} ${
            disabled ? 'bg-gray-50 dark:bg-gray-600' : ''
          }`}
          id={name}
          disabled={disabled}
          type={displayTextIfForPassword}
          value={value}
          placeholder={text}
          onChange={(event) => handleInput(event)}
        />

        <div className="absolute top-0 right-2 h-full flex items-center justify-center">
          <IconsFromInput status={status} onClick={togglePassword}>
            {displayEyeIcon ? showIcon() : null}
          </IconsFromInput>

          <IconsFromInput status={status}>
            {status === 'warning' ? <AiFillWarning className="ml-1" /> : null}
          </IconsFromInput>

          <IconsFromInput status={status}>
            {status === 'invalid' ? <MdError className="ml-1" /> : null}
          </IconsFromInput>
        </div>
      </div>

      {message ? (
        <div role="alert" className={`text-xs mt-1 ${getStyles}`}>
          {message}
        </div>
      ) : null}
    </GroupInput>
  );
};

Input.defaultProps = {
  status: '',
  message: '',
  disabled: false,
  type: '',
};
