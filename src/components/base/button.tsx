import { ReactNode } from 'react';

type buttonTypeNormal = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  dataTestid?: string;
};

export const Button = ({
  children,
  ariaLabel,
  className,
  disabled,
  onClick,
  dataTestid,
}: buttonTypeNormal) => (
  <button
    data-testid={dataTestid}
    onClick={onClick}
    className={className}
    disabled={disabled}
    aria-label={ariaLabel}
    type="button">
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  className: '',
  ariaLabel: '',
  dataTestid: '',
};
