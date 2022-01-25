import React from 'react';
import { buttonTypeNormal } from '@/interfaces/button';

export default function Button({
  children,
  className = '',
  ariaLabel = '',
  disabled = false,
  onClick = () => {},
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
