import { ReactNode } from 'react';

interface buttonTypeNormal {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  dataTestid?: string;
  type?: 'button' | 'submit';
}

export const Button = ({ children, ariaLabel, className, disabled, onClick, dataTestid, type }: buttonTypeNormal) => (
  <button
    data-testid={dataTestid}
    onClick={onClick}
    className={className}
    disabled={disabled}
    aria-label={ariaLabel}
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
  onClick: () => null,
};
