type labelType = {
  name: string;
  text: string;
};

const LabelComponent = ({ name, text }: labelType) => (
  <label className="text-skin-textColor" htmlFor={name}>
    {text}
  </label>
);
export default LabelComponent;
