import { propsInterfaceInput } from '@/interfaces/input';
import GroupInput from './groupInput';

export default function Input({
  disabled,
  type,
  value,
  text,
  setValue,
  name,
}: propsInterfaceInput) {
  return (
    <GroupInput>
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
    </GroupInput>
  );
}
