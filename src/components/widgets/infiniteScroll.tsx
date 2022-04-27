import { ReactNode } from 'react';
import ReactInfiniteScroll from 'react-infinite-scroll-component';

type infiniteScrollType = {
  length: number;
  LoadMore: Function;
  hasMore: boolean;
  children: ReactNode;
};

export const InfiniteScroll = ({ children, length, LoadMore, hasMore }: infiniteScrollType) => (
  <ReactInfiniteScroll
    dataLength={length}
    style={{ overflowX: 'hidden' }}
    next={() => LoadMore()}
    hasMore={hasMore}
    loader={<h4>Carregando...</h4>}
    endMessage={
      <h3 className="p-0 m-0 w-full text-center text-gray-600 font-bold dark:text-white">
        Isso é tudo, por enquanto...
      </h3>
    }>
    {children}
  </ReactInfiniteScroll>
);
