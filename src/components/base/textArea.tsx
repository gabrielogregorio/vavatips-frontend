interface propsInterface {
  title: string;
  value: string;
  setValue: (e: any) => void;
}

export default function TextArea({ title, setValue, value }: propsInterface) {
  return (
    <div className="groupInput">
      <div className="groupInputSelect">
        <label aria-label="Escolha uma descrição" htmlFor="textArea">
          {title}
        </label>
        <textarea id="textArea" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}
