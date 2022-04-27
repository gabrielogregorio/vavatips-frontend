import { ReactNode } from 'react';

interface buttonTypeNormal {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  dataTestid?: string;
  ariaHidden?: boolean;
  type?: 'button' | 'submit';
}

export const Button = ({
  children,
  ariaLabel,
  className,
  disabled,
  onClick,
  dataTestid,
  type,
  ariaHidden,
}: buttonTypeNormal) => (
  <button
    data-testid={dataTestid}
    onClick={onClick}
    className={className}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-hidden={ariaHidden}
    type={type === 'button' ? 'button' : 'submit'}>
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  className: '',
  ariaLabel: '',
  dataTestid: '',
  type: 'button',
  ariaHidden: false,
  onClick: () => null,
};
