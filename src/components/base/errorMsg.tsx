interface propsInterface {
  msg: string;
}

export default function ErrorMsg({ msg }: propsInterface) {
  return <p className="p-0 m-0 w-full text-center text-skin-danger">{msg}</p>;
}
