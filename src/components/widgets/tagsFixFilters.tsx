import { Button } from '@/base/button';
import { IFilterUrl } from '@/hooks/usePosts';

type TProps = {
  queryUrl: IFilterUrl;
};

export const TagsFixFilters = ({ queryUrl }: TProps) => (
  <div className="flex justify-center">
    <div>
      {queryUrl.agent ? (
        <Button onClick={() => null} className="bg-transparent p-2 m-2 text-skin-secondary-regular">
          #{queryUrl.agent}
        </Button>
      ) : null}
    </div>
    <div>
      {queryUrl.map ? (
        <Button onClick={() => null} className="bg-transparent p-2 m-2 text-skin-secondary-regular">
          #{queryUrl.map}
        </Button>
      ) : null}
    </div>
  </div>
);
