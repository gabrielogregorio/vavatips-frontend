import { useFilters } from '../../core/contexts/filters';
import { Button } from '../base/button';

export const PostTags = () => {
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
    return tags.map((tag, index) => (
      <div className="btn" key={index} onClick={() => toggleTag(tag)}>
        <Button className={filters.includes(tag) ? 'btnActive' : ''}>{tag} a</Button>
      </div>
    ));
  }
  return <div className="tags"> {renderTags()} </div>;
};
