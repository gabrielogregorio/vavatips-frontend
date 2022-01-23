import { propsInterfaceSelectedBase } from '@/interfaces/select';

export default function Selected({ render, text, setValue, value }: propsInterfaceSelectedBase) {
  function renderItems() {
    return render.map((item) => (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    ));
  }

  return (
    <div className="groupInputSelect">
      <label htmlFor="select">{text}</label>
      <select id="select" value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="" aria-label="Nenhum agente selecionado" />
        {renderItems()}
      </select>
    </div>
  );
}
