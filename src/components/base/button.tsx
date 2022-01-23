type buttonType = {
  children: any;
  disabled?: boolean;
  className?: string;
  onClick?: () => any;
};

function handleOnClick(): boolean {
  return true;
}

export default function Button({ children, className = '', disabled = false, onClick = handleOnClick }: buttonType) {
  return (
    <button onClick={onClick} className={className} disabled={disabled} type="button">
      {children}
    </button>
  );
}
