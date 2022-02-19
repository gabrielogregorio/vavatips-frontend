import GroupInput from '@/base/groupInput';
import LabelComponent from '@/base/label';

export interface propsInterfaceTextArea {
  name: string;
  title: string;
  value: string;
  setValue: (value: string) => void;
}

const TextArea = ({ title, setValue, value, name }: propsInterfaceTextArea) => (
  <GroupInput>
    <LabelComponent name={name} text={title} aria-label="Escolha uma descrição" />

    <textarea
      className="w-full p-1.5 border-2 border-skin-primary-light dark:bg-skin-gray-900 bg-skin-gray-300 outline-none rounded-lg resize-none dark:text-skin-gray-400 text-skin-gray-500"
      id={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </GroupInput>
);
export default TextArea;
