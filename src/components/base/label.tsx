type labelType = {
  name: string;
  text: string;
};

export default function LabelComponent({ name, text }: labelType) {
  return (
    <label className="text-skin-textColor" htmlFor={name}>
      {text}
    </label>
  );
}
