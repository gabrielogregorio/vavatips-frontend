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
    <li className="bg-skin-bgPrimary">
      <Link
        passHref
        aria-label={`Navega para a página ${page}`}
        href={resolveQuery(urlBase, { page, map, agent })}>
        <button type="button" className={`${active ? 'bg-red-400' : ''}`}>
          {page}
        </button>
      </Link>
    </li>
  );
}

export function PaginationDotItems() {
  return (
    <li className="text-skin-textColorLink">
      <button type="button">...</button>
    </li>
  );
}
