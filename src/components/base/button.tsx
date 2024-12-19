import { ReactElement, ReactNode } from 'react';

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

  ariaHidden = false,
  ariaLabel = '',
  className = '',
  dataTestid = '',
  disabled = false,
  onClick = (): void => null,
  type = 'button',
}: buttonTypeNormal): ReactElement => (
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
