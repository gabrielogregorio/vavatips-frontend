type labelType = {
  name: string;
  text: string;
};

const LabelComponent = ({ name, text }: labelType) => (
  <label className="dark:text-skin-white text-skin-gray-500" htmlFor={name}>
    {text}
  </label>
);
export default LabelComponent;
