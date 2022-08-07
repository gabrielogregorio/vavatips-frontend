import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type imageCardType = {
  href: string;
  srcImage: string;
  titleImage: string;
  heightImage: string;
};
export const ImageCard = ({ href, srcImage, titleImage, heightImage }: imageCardType) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleWithIsLoadedImage = () => {
    setIsLoaded(true);
  };

  return (
    <Link href={href} passHref>
      <button
        type="button"
        className="flex flex-col justify-center items-center flex-1 opacity-90 hover:scale-110 hover:opacity-100 transition duration-150 rounded-md">
        <div
          data-testid="loading"
          className={`block relative w-full rounded-md overflow-hidden ${heightImage} ${
            isLoaded ? '' : 'wait-load-pulse'
          }`}>
          <Image
            layout="fill"
            className="flex-1 object-cover"
            src={srcImage}
            data-src={srcImage}
            alt={titleImage}
            priority
            onLoadingComplete={() => handleWithIsLoadedImage()}
          />
        </div>
        <p className="dark:text-skin-white text-skin-gray-800" style={{ opacity: 0.8 }}>
          {titleImage}
        </p>
      </button>
    </Link>
  );
};
