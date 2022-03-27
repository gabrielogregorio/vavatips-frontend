import { GroupInput } from './groupInput';
import { getStylesFromInput, styleLiteral, typeInputColors } from './input';
import { Label } from './label';

export type TPropsSelectedBase = {
  text: string;
  register: any;
  errors: any;
  name: string;
  render: { id: string; name: string }[];
  status?: typeInputColors;
  disabled?: boolean;
};

export const Selected = ({ render, text, register, errors, name, status, disabled }: TPropsSelectedBase) => {
  let getStyles = getStylesFromInput(status);

  function renderItems() {
    return render.map((item) => (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    ));
  }

  const errorMessages = errors?.[name]?.message ?? '';
  const hasError = !!(errors && errorMessages);

  getStyles = hasError ? styleLiteral.invalid : getStyles;

  return (
    <GroupInput>
      <Label name={name} text={text} className={[getStyles]} />
      <select
        {...(register && register(name))}
        className={` resize-none w-full px-3 py-2 focus:shadow-sm top-0 left-0 border bg-transparent outline-none rounded-md text-xs dark:text-gray-100 dark:bg-skin-gray-900 ${getStyles} ${
          disabled ? 'bg-gray-50' : ''
        }`}
        id={name}>
        <option value="" aria-label="Nenhum agente selecionado" />
        {renderItems()}
      </select>

      {hasError ? (
        <div role="alert" className={`text-xs mt-1 ${getStyles}`}>
          {errorMessages}
        </div>
      ) : null}
    </GroupInput>
  );
};

Selected.defaultProps = {
  status: '',
  disabled: false,
};
