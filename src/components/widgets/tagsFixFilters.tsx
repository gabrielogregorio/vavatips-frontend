import Button from '@/base/button';
import { filterUrlInterface } from '@/hooks/usePosts';

interface propsInterface {
  queryUrl: filterUrlInterface;
}

const TagsFixFilters = ({ queryUrl }: propsInterface) => (
  <div className="flex justify-center">
    <div>
      {queryUrl.agent ? (
        <Button onClick={() => null} className="bg-transparent p-2 m-2 text-skin-primaryExtra">
          #{queryUrl.agent}
        </Button>
      ) : null}
    </div>
    <div>
      {queryUrl.map ? (
        <Button onClick={() => null} className="bg-transparent p-2 m-2 text-skin-primaryExtra">
          #{queryUrl.map}
        </Button>
      ) : null}
    </div>
  </div>
);
export default TagsFixFilters;
