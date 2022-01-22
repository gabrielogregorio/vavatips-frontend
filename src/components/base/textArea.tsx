interface propsInterface {
  title: string;
  value: string;
  setValue: (e: any) => void;
}

export const TextArea = (props: propsInterface) => {
  return (
    <div className="groupInput">
      <div className="groupInputSelect">
        <label htmlFor="">{props.title}</label>
        <textarea value={props.value} onChange={(e) => props.setValue(e.target.value)}></textarea>
      </div>
    </div>
  );
};
