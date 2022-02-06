import Link from 'next/link';
import { PaginationButtonInterface } from '@/interfaces/pagination';
import resolveQuery from '@/helpers/resolveQuery';

export default function PaginationButtons({
  numberOfPage: page = 1,
  active,
  urlBase,
  map,
  agent,
}: PaginationButtonInterface) {
  return (
    <li className="bg-transparent text-skin-btnActionsSave p-3 pb-1 pt-1 transition duration-150">
      <Link
        passHref
        aria-label={`Navega para a página ${page}`}
        href={resolveQuery(urlBase, { page, map, agent })}>
        <a
          href="#/"
          className={`block p-2 bg-transparent hover:bg-skin-btnActionsSave hover:text-skin-textColor ${
            active ? 'bg-skin-btnActionsSave text-skin-textColorINVERSE' : ''
          }`}>
          {page}
        </a>
      </Link>
    </li>
  );
}

export function PaginationDotItems() {
  return (
    <li className="bg-transparent text-skin-btnActionsSave p-3 pb-1 pt-1">
      <a href="#/" type="button">
        ...
      </a>
    </li>
  );
}
