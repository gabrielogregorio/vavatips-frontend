export const Button = ({ children, ...rest }: any) => {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
};
