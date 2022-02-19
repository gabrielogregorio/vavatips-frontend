type labelType = {
  name: string;
  text: string;
};

const LabelComponent = ({ name, text }: labelType) => (
  <label className="dark:text-skin-textColor text-skin-textColorGray" htmlFor={name}>
    {text}
  </label>
);
export default LabelComponent;
