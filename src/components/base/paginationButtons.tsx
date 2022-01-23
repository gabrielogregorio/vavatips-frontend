import Link from 'next/link';
import { generateUrl } from '@/helpers/UrlMout';
import styles from '../../styles/components/paginationButtons.style.module.css';

interface PaginationButtonInterface {
  numberOfPage: any;
  active: boolean;
  map: string;
  agent: string;
  urlBase: string;
}

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
