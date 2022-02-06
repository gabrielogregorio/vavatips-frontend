import { propsInterfaceInput } from '@/interfaces/input';
import GroupInput from './groupInput';
import LabelComponent from './label';

export default function Input({
  disabled,
  type,
  value,
  text,
  setValue,
  name,
}: propsInterfaceInput) {
  // remo
  return (
    <GroupInput>
      <LabelComponent name={name} text={text} />
      <input
        className="w-full p-1.5 border-2 border-skin-secondary bg-skin-bgContainer outline-none rounded-lg resize-none text-skin-textColor"
        id={name}
        disabled={disabled}
        type={type}
        value={value}
        placeholder={text}
        onChange={(e) => setValue(e.target.value)}
      />
    </GroupInput>
  );
}
