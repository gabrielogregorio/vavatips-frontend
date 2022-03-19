type labelType = {
  name: string;
  text: string;
  className?: string[];
};

export const Label = ({ name, text, className }: labelType) => {
  const classString = className.join(' ');

  return (
    <label className={`text-xs uppercase mb-1 ${classString} dark:text-gray-300`} htmlFor={name}>
      {text}
    </label>
  );
};

Label.defaultProps = {
  className: [],
};
