import { IFilterUrl } from '@/hooks/usePosts';

type TProps = {
  queryUrl: IFilterUrl;
};

export const TagsFixFilters = ({ queryUrl }: TProps) => (
  <div className="flex justify-center">
    <div>
      {queryUrl.agent ? (
        <button type="button" className="bg-transparent p-2 m-2 text-skin-secondary-regular">
          #{queryUrl.agent}
        </button>
      ) : null}
    </div>
    <div>
      {queryUrl.map ? (
        <button type="button" className="bg-transparent p-2 m-2 text-skin-secondary-regular">
          #{queryUrl.map}
        </button>
      ) : null}
    </div>
  </div>
);
