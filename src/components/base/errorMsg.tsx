interface propsInterface {
  msg: string;
}

const ErrorMsg = ({ msg }: propsInterface) => (
  <p className="p-0 m-0 w-full text-center text-skin-secondary-regular">{msg}</p>
);

export default ErrorMsg;
