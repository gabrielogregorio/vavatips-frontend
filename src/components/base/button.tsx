import React from 'react';
import { buttonTypeNormal } from '@/interfaces/button';

function handleOnClick(): boolean {
  return true;
}

export default function Button({
  children,
  className = '',
  ariaLabel = '',
  disabled = false,
  onClick = handleOnClick,
}: buttonTypeNormal) {
  return (
    <button onClick={onClick} className={className} disabled={disabled} aria-label={ariaLabel} type="button">
      {children}
    </button>
  );
}
