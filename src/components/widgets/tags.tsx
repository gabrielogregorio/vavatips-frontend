import { useFilters } from '@/contexts/filters';
import Button from '@/base/button';

const Tags = () => {
  const { tags, filters, setFilters } = useFilters();

  function toggleTag(tag: string) {
    const filterCopy: string[] = JSON.parse(JSON.stringify(filters));

    if (filterCopy.includes(tag)) {
      filterCopy.splice(filterCopy.indexOf(tag), 1);
    } else {
      filterCopy.push(tag);
    }
    setFilters(filterCopy);
  }

  function renderTags() {
    return tags.map((tag) => (
      <div
        className="m-1 text-skin-primary-light"
        key={tag}
        onClick={() => toggleTag(tag)}
        role="presentation">
        <Button
          onClick={() => null}
          className={`p-3 pb-1 pt-1 border border-skin-primary-light rounded-2xl ${
            filters.includes(tag) ? 'text-skin-white bg-skin-primary-light' : ''
          }`}>
          {tag}
        </Button>
      </div>
    ));
  }
  return <div className="flex justify-center flex-wrap m-10 mt-1 mb-1"> {renderTags()} </div>;
};
export default Tags;
