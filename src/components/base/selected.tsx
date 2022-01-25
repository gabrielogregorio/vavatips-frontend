import { propsInterfaceSelectedBase } from '@/interfaces/select';

export default function Selected({ render, text, setValue, value, name }: propsInterfaceSelectedBase) {
  function renderItems() {
    return render.map((item) => (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    ));
  }

  return (
    <div className="groupInputSelect">
      <label htmlFor={name}>{text}</label>
      <select id={name} value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="" aria-label="Nenhum agente selecionado" />
        {renderItems()}
      </select>
    </div>
  );
}
