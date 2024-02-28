import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

type imageCardType = {
  href: string;
  srcImage: string;
  titleImage: string;
  heightImage: string;
  width: number;
  height: number;
};
export const ImageCard = ({ href, srcImage, titleImage, heightImage, height, width }: imageCardType): ReactElement => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleWithIsLoadedImage = (): void => {
    setIsLoaded(true);
  };

  return (
    <Link href={href} passHref>
      <button
        type="button"
        className="flex flex-col justify-center items-center flex-1 opacity-90 hover:scale-110 hover:opacity-100 transition duration-150 rounded-md m-2">
        <div
          data-testid="loading"
          className={`block relative w-full rounded-md overflow-hidden ${heightImage} ${
            isLoaded ? '' : 'wait-load-pulse'
          }`}>
          <Image
            height={height}
            width={width}
            className="flex-1 object-cover"
            src={srcImage}
            data-src={srcImage}
            alt={titleImage}
            priority
            onLoadingComplete={(): void => handleWithIsLoadedImage()}
          />
        </div>
        <p className="dark:text-skin-white text-skin-gray-800" style={{ opacity: 0.8 }}>
          {titleImage}
        </p>
      </button>
    </Link>
  );
};
