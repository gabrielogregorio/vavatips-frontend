import { useEffect, useState } from 'react';
import { PaginationButtons, PaginationDotItems } from '@/base/paginationButtons';

type propsType = {
  finish: number;
  selected: number;
  map: string;
  agent: string;
  urlBase: 'ViewPosts' | 'posts' | 'save' | 'tested';
};

const maxValuePagination = 3;

export const Pagination = ({ finish, selected, map, agent, urlBase }: propsType) => {
  const [pagination, setPagination] = useState<{ id: number }[]>([]);

  useEffect(() => {
    const paginationTemp: { id: number }[] = [];
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
        numberOfPage === selected + maxValuePagination ||
        numberOfPage === selected - maxValuePagination;

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
    <nav
      aria-label="Sistema de paginação"
      className={`
     flex items-center justify-center mt-2 rounded-md ${
       pagination?.length > 0 ? 'b-2 p-1 border-2  border-skin-secondary-regular' : ''
     }`}>
      <ul className="flex items-center list-none">{renderPaginationButtons()}</ul>
    </nav>
  );
};
