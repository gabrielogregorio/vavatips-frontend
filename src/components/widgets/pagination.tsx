import React, { useEffect, useState } from 'react';
import PaginationButtons, { PaginationDotItems } from '@/base/paginationButtons';
import styles from '../../styles/components/pagination.style.module.css';

type urlBase = 'ViewPosts' | 'Posts' | 'save' | 'tested';

interface propsInterface {
  initial: number;
  finish: number;
  selected: number;
  map: string;
  agent: string;
  urlBase: urlBase;
}

interface interfacePagination {
  id: number;
}

const maxValuePagination = 3;

export default function PaginationComponent({ finish, selected, map, agent, initial, urlBase }: propsInterface) {
  const [pagination, setPagination] = useState<interfacePagination[]>([]);

  useEffect(() => {
    const paginationTemp: interfacePagination[] = [];
    for (let i = 1; i <= finish; i += 1) {
      paginationTemp.push({ id: i });
    }
    setPagination(paginationTemp);
  }, [finish, selected]);

  function renderPaginationButtons() {
    return pagination.map(({ id: numberOfPage }) => {
      const isSelectedButton: boolean = numberOfPage === selected;

      const isFirstLastOrIntervalButton: boolean =
        numberOfPage === 1 ||
        numberOfPage === finish ||
        isSelectedButton ||
        (numberOfPage >= selected - 2 && numberOfPage <= selected + 2);

      const isInsideLimitPagination =
        numberOfPage === selected + maxValuePagination || numberOfPage === selected - maxValuePagination;

      if (isFirstLastOrIntervalButton) {
        return (
          <PaginationButtons
            numberOfPage={numberOfPage}
            key={numberOfPage}
            active={isSelectedButton}
            urlBase={urlBase}
            map={map}
            agent={agent}
          />
        );
      }
      if (isInsideLimitPagination) {
        return <PaginationDotItems key={numberOfPage} />;
      }

      return null;
    });
  }

  return (
    <nav aria-label="Sistema de paginação" className={styles.pagination}>
      <ul className={styles.paginationItems}>{renderPaginationButtons()}</ul>
    </nav>
  );
}
