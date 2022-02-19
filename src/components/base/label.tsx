type labelType = {
  name: string;
  text: string;
};

const LabelComponent = ({ name, text }: labelType) => (
  <label className="dark:text-skin-gray-400 text-skin-gray-500" htmlFor={name}>
    {text}
  </label>
);
export default LabelComponent;
