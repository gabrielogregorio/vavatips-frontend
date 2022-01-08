import { Button } from '../base/button';

interface propsInterface {
  queryUrl: any;
}

export const TagsFixFilters = ({ queryUrl }: propsInterface) => {
  return (
    <div>
      <div className="btn-base">
        {queryUrl.agent ? <Button>#{queryUrl.agent}</Button> : null}
      </div>
      <div className="btn-base">
        {queryUrl.map ? <Button>#{queryUrl.map}</Button> : null}
      </div>
    </div>
  );
};
