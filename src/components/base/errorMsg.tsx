interface propsInterface {
  msg: string;
}

export default function ErrorMsg({ msg }: propsInterface) {
  return <p className="errorMsg">{msg}</p>;
}
