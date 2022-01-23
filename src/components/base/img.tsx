interface propsInterface {
  src: string;
  alt: string;
}

export default function Img({ src, alt }: propsInterface) {
  return <img src={src} alt={alt} />;
}
