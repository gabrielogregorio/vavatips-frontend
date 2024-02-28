import Image from 'next/image';
import { ReactElement } from 'react';

type screenErrorType = {
  tryRenderAgain: Function;
};

export const ScreenError = ({ tryRenderAgain }: screenErrorType): ReactElement => (
  <div className="flex items-center justify-center flex-col p-16 border-2 dark:border-gray-700">
    <h2 className="text-xl  dark:text-white">Ooops, aconteceu um problema inesperado</h2>

    <p className="mt-4 dark:text-white">Isso será reportado aos desenvolvedores, foi mal pela situação</p>

    <div className="relative w-full h-64">
      <Image width={500} height={500} alt="" src="/images/assets/problem.svg" />
    </div>

    <div className="text-xs text-white mb-2">
      <a href="https://storyset.com/people">People illustrations by Storyset</a>
    </div>

    <button
      type="button"
      onClick={(): void => tryRenderAgain()}
      className="focus:outline-none bg-red-400 text-white px-3.5 py-2 rounded-sm hover:scale-110 transition duration-200">
      Tentar novamente
    </button>
  </div>
);
