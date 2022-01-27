import Link from 'next/link';
import { PaginationButtonInterface } from '@/interfaces/pagination';
import styles from '../../styles/components/paginationButtons.style.module.css';
import resolveQuery from '../../core/helpers/resolveQuery';

export default function PaginationButtons({
  numberOfPage: page = 1,
  active,
  urlBase,
  map,
  agent,
}: PaginationButtonInterface) {
  return (
    <li className={styles.selectedButton}>
      <Link aria-label={`Navega para a página ${page}`} href={resolveQuery(urlBase, { page, map, agent })}>
        <a className={`${active ? styles.active : ''}`}>{page}</a>
      </Link>
    </li>
  );
}

export function PaginationDotItems() {
  return (
    <li className={styles.selectedButton}>
      <a>...</a>
    </li>
  );
}
