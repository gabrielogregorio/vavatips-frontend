import { ChangeEvent } from 'react';
import { GroupInput } from './groupInput';
import { getStylesFromInput, typeInputColors } from './input';
import { Label } from './label';

export type TPropsSelectedBase = {
  text: string;
  value: string;
  setValue: (value: string) => void;
  name: string;
  render: { id: string; name: string }[];
  status?: typeInputColors;
  disabled?: boolean;
};

export const Selected = ({
  render,
  text,
  setValue,
  value,
  name,
  status,
  disabled,
}: TPropsSelectedBase) => {
  const getStyles = getStylesFromInput(status);

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
      <Label name={name} text={text} className={[getStyles]} />
      <select
        className={` resize-none w-full px-3 py-2 focus:shadow-sm top-0 left-0 border bg-transparent outline-none rounded-md text-xs dark:text-gray-100 ${getStyles} ${
          disabled ? 'bg-gray-50' : ''
        }`}
        id={name}
        value={value}
        onChange={(e) => onChange(e)}>
        <option value="" aria-label="Nenhum agente selecionado" />
        {renderItems()}
      </select>
    </GroupInput>
  );
};

Selected.defaultProps = {
  status: '',
  disabled: false,
};
