import Button from '@/base/button';

interface propsInterface {
  queryUrl: any;
}

export default function TagsFixFilters({ queryUrl }: propsInterface) {
  return (
    <div className="flex justify-center">
      <div className="bg-skin-primary p-2 m-2 text-skin-textColorLink">
        {queryUrl.agent ? <Button>#{queryUrl.agent}</Button> : null}
      </div>
      <div className="bg-skin-primary p-2 m-2 text-skin-textColorLink">
        {queryUrl.map ? <Button>#{queryUrl.map}</Button> : null}
      </div>
    </div>
  );
}
