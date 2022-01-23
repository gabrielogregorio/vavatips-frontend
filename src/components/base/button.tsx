type buttonType = {
  children: any;
  disabled?: boolean;
  className?: string;
  onClick?: () => any;
  ariaLabel?: string;
};

function handleOnClick(): boolean {
  return true;
}

export default function Button({
  children,
  className = '',
  ariaLabel = '',
  disabled = false,
  onClick = handleOnClick,
}: buttonType) {
  return (
    <button onClick={onClick} className={className} disabled={disabled} aria-label={ariaLabel} type="button">
      {children}
    </button>
  );
}
