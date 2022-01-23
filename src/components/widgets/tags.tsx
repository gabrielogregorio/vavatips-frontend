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
      <div className="btn" key={tag} onClick={() => toggleTag(tag)} role="presentation">
        <Button className={filters.includes(tag) ? 'btnActive' : ''}>{tag}</Button>
      </div>
    ));
  }
  return <div className="tags"> {renderTags()} </div>;
}
