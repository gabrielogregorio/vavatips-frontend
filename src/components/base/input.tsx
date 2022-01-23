import { propsInterfaceInput } from '@/interfaces/input';

export default function Input({ disabled, type, value, text, setValue, name }: propsInterfaceInput) {
  return (
    <div className="groupInput">
      <div className="groupInputSelect">
        <label htmlFor={name}>{text}</label>
        <input
          id={name}
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
