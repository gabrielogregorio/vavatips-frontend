import Button from './button';

export default function ButtonForm({ children, className, ...rest }: any) {
  return (
    <Button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={`w-full border-2 rounded-xl ${className}`}>
      {children}
    </Button>
  );
}
