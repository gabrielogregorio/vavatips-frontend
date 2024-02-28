import Link from 'next/link';
import { resolveQuery } from '@/helpers/resolveQuery';
import { ReactElement } from 'react';

type TPaginationButton = {
  numberOfPage: number;
  active: boolean;
  map: string;
  agent: string;
  urlBase: string;
};

const DEFAULT_PAGE = 1;

export const PaginationButtons = ({
  numberOfPage: page = DEFAULT_PAGE,
  active,
  urlBase,
  map,
  agent,
}: TPaginationButton): ReactElement => (
  <li className="bg-transparent text-skin-secondary-regular p-3 pb-1 pt-1 transition duration-150">
    <Link
      aria-label={`Navega para a página ${page}`}
      href={resolveQuery(urlBase, { agent, map, page })}
      className={`block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-white ${
        active ? 'bg-skin-secondary-light text-skin-white' : ''
      }`}>
      {page}
    </Link>
  </li>
);

export const PaginationDotItems = (): ReactElement => (
  <li className="bg-transparent text-skin-secondary-regular p-3 pb-1 pt-1">
    <a href="#/" type="button">
      ...
    </a>
  </li>
);
