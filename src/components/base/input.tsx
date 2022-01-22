type typeInput = 'text' | 'password' | 'email';

interface propsInterface {
  text: string;
  value: string;
  type: typeInput;
  disabled?: boolean;
  setValue: (e: any) => void;
}

export const Input = (props: propsInterface) => {
  const disabled = props.disabled ?? false;

  return (
    <div className="groupInput">
      <div className="groupInputSelect">
        <label htmlFor="">{props.text}</label>
        <input
          disabled={disabled}
          type={props.type}
          value={props.value}
          placeholder={props.text}
          onChange={(e) => props.setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
