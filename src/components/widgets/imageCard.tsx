import Image from 'next/image';
import Link from 'next/link';

type imageCardType = {
  href: string;
  srcImage: string;
  titleImage: string;
  heightImage: string;
};

export default function ImageCard({ href, srcImage, titleImage, heightImage }: imageCardType) {
  return (
    <Link href={href} passHref>
      <button type="button" className="flex flex-col justify-center items-center flex-1 h-40">
        <div className={`block relative w-full ${heightImage}`}>
          <Image layout="fill" className="flex-1 object-cover" src={srcImage} alt={titleImage} />
        </div>
        <p className="text-skin-textColor" style={{ opacity: 0.8 }}>
          {titleImage}
        </p>
      </button>
    </Link>
  );
}
