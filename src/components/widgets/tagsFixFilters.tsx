import Button from '@/base/button';

interface propsInterface {
  queryUrl: any;
}

export default function TagsFixFilters({ queryUrl }: propsInterface) {
  return (
    <div className="flex justify-center">
      <div>
        {queryUrl.agent ? (
          <Button className="bg-transparent p-2 m-2 text-skin-primaryExtra">
            #{queryUrl.agent}
          </Button>
        ) : null}
      </div>
      <div>
        {queryUrl.map ? (
          <Button className="bg-transparent p-2 m-2 text-skin-primaryExtra">#{queryUrl.map}</Button>
        ) : null}
      </div>
    </div>
  );
}
