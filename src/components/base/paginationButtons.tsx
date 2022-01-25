import Link from 'next/link';
import generateUrl from '@/helpers/UrlMount';
import { PaginationButtonInterface } from '@/interfaces/pagination';
import styles from '../../styles/components/paginationButtons.style.module.css';

export default function PaginationButtons({ numberOfPage, active, urlBase, map, agent }: PaginationButtonInterface) {
  return (
    <li className={styles.selectedButton}>
      <Link aria-label={`Navega para a página ${numberOfPage}`} href={generateUrl(numberOfPage, urlBase, map, agent)}>
        <a className={`${active ? styles.active : ''}`}>{numberOfPage}</a>
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
