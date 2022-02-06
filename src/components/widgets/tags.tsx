import { useFilters } from '@/contexts/filters';
import Button from '@/base/button';

export default function PostTags() {
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
        className="m-1 text-skin-secondary"
        key={tag}
        onClick={() => toggleTag(tag)}
        role="presentation">
        <Button
          className={`p-3 pb-1 pt-1 border border-skin-secondary rounded-2xl ${
            filters.includes(tag) ? 'text-skin-textColorInDarkness bg-skin-secondary' : ''
          }`}>
          {tag}
        </Button>
      </div>
    ));
  }
  return <div className="flex justify-center flex-wrap m-10 mt-1 mb-1"> {renderTags()} </div>;
}
