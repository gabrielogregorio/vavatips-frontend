import { ChangeEvent } from 'react';
import GroupInput from './groupInput';
import LabelComponent from './label';

export interface propsInterfaceSelectedBase {
  text: string;
  value: string;
  setValue: (value: string) => void;
  name: string;
  render: { id: string; name: string }[];
}

const Selected = ({ render, text, setValue, value, name }: propsInterfaceSelectedBase) => {
  function renderItems() {
    return render.map((item) => (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    ));
  }

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <GroupInput>
      <LabelComponent name={name} text={text} />
      <select
        className="w-full p-1.5 border-2 border-skin-secondary bg-skin-bgContainer outline-none rounded-lg resize-none text-skin-textColor"
        id={name}
        value={value}
        onChange={(e) => onChange(e)}>
        <option value="" aria-label="Nenhum agente selecionado" />
        {renderItems()}
      </select>
    </GroupInput>
  );
};
export default Selected;
