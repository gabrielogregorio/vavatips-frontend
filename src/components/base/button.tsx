import React from 'react';

type buttonTypeNormal = {
  children: any;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  dataTestid?: string;
};

export default function Button({
  children,
  ariaLabel,
  className,
  disabled,
  onClick,
  dataTestid,
}: buttonTypeNormal) {
  return (
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
}

Button.defaultProps = {
  disabled: false,
  className: '',
  ariaLabel: '',
  dataTestid: '',
};
