interface propsInterface {
  src: string;
  alt: string;
}

export const Img = ({ src, alt }: propsInterface) => {
  return <img src={src} alt={alt} />;
};
