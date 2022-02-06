import Link from 'next/link';

type imageCardType = {
  href: string;
  srcImage: string;
  titleImage: string;
};

export default function ImageCard({ href, srcImage, titleImage }: imageCardType) {
  return (
    <Link href={href} passHref>
      <button type="button" className="flex flex-col justify-center items-center flex-1 ">
        <img className="flex-1 object-cover" src={srcImage} alt={titleImage} />
        <p className="text-skin-textColor" style={{ opacity: 0.8 }}>
          {titleImage}
        </p>
      </button>
    </Link>
  );
}
