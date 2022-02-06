import { propsInterfaceSelectedBase } from '@/interfaces/select';
import GroupInput from './groupInput';
import LabelComponent from './label';

export default function Selected({
  render,
  text,
  setValue,
  value,
  name,
}: propsInterfaceSelectedBase) {
  function renderItems() {
    return render.map((item) => (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    ));
  }

  return (
    <GroupInput>
      <LabelComponent name={name} text={text} />
      <select
        className="w-full p-1.5 border-2 border-skin-secondary bg-skin-backgroundSecondary outline-none rounded-lg resize-none text-skin-textColor"
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}>
        <option value="" aria-label="Nenhum agente selecionado" />
        {renderItems()}
      </select>
    </GroupInput>
  );
}
