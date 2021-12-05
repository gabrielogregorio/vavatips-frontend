import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/pagination.style.module.css';
import {
  PaginationButtons,
  PaginationDotItems,
} from '../base/paginationButtons';

type urlBase = 'ViewPosts' | 'Posts' | 'Save' | 'Tested';

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

export const PaginationComponent = (props: propsInterface) => {
  const [pagination, setPagination] = useState<interfacePagination[]>([]);

  useEffect(() => {
    const paginationTemp: interfacePagination[] = [];
    for (let i = 1; i <= props.finish; i++) {
      paginationTemp.push({ id: i });
    }
    setPagination(paginationTemp);
  }, [props]);

  function renderPaginationButtons() {
    return pagination.map(({ id: numberOfPage }) => {
      const isSelectedButton: boolean = numberOfPage === props.selected;

      const isFirstLastOrIntervalButton: boolean =
        numberOfPage === 1 ||
        numberOfPage === props.finish ||
        isSelectedButton ||
        (numberOfPage >= props.selected - 2 &&
          numberOfPage <= props.selected + 2);

      const isInsideLimitPagination =
        numberOfPage === props.selected + maxValuePagination ||
        numberOfPage === props.selected - maxValuePagination;

      if (isFirstLastOrIntervalButton) {
        return (
          <PaginationButtons
            numberOfPage={numberOfPage}
            key={numberOfPage}
            active={isSelectedButton}
            props={props}
          />
        );
      } else if (isInsideLimitPagination) {
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
};
