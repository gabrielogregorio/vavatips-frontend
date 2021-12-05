import { Link } from 'react-router-dom';
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
        to={generateUrl(numberOfPage, urlBase, map, agent)}
        className={`${active ? styles.active : ''}`}>
        {numberOfPage}
      </Link>
    </li>
  );
};

export const PaginationDotItems = () => {
  return (
    <li className={styles.selectedButton}>
      <Link aria-hidden to="#">
        ...
      </Link>
    </li>
  );
};
