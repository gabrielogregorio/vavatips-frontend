type typeInput = 'text' | 'password' | 'email';

interface propsInterface {
  text: string;
  value: string;
  type: typeInput;
  disabled?: boolean;
  setValue: (e: string) => any;
}

export default function Input({ disabled, type, value, text, setValue }: propsInterface) {
  return (
    <div className="groupInput">
      <div className="groupInputSelect">
        <label htmlFor="input">{text}</label>
        <input
          id="input"
          disabled={disabled}
          type={type}
          value={value}
          placeholder={text}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
