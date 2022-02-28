interface PropsInterface {
  msg: string;
}

export const ErrorMsg = ({ msg }: PropsInterface) => (
  <p className="p-0 m-0 w-full text-center text-skin-secondary-regular">{msg}</p>
);
