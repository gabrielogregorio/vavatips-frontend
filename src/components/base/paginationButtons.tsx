import Link from 'next/link';
import { generateUrl } from '../../core/helpers/UrlMout';
import styles from '../../styles/components/paginationButtons.style.module.css';

interface PaginationButtonInterface {
  numberOfPage: any;
  active: boolean;
  props: any;
}

export const PaginationButtons = ({
  numberOfPage,
  active,
  props: { urlBase, map, agent },
}: PaginationButtonInterface) => {
  return (
    <li className={styles.selectedButton}>
      <Link
        aria-label={`Navega para a página ${numberOfPage}`}
        href={generateUrl(numberOfPage, urlBase, map, agent)}>
        <a className={`${active ? styles.active : ''}`}>{numberOfPage}</a>
      </Link>
    </li>
  );
};

export const PaginationDotItems = () => {
  return (
    <li className={styles.selectedButton}>
      <Link aria-hidden href="#">
        ...
      </Link>
    </li>
  );
};
