interface propsInterface {
  msg: string;
}

export const ErrorMsg = ({ msg }: propsInterface) => {
  return <p className="errorMsg">{msg}</p>;
};
