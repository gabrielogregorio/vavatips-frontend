import { Button } from '@/base/button';

type tagsType = {
  tags: string[];
  filteredActives: string[];
  setFilteredActive: Function;
};

export const Tags = ({ tags, filteredActives, setFilteredActive }: tagsType) => {
  const toggleTag = (tag) => {
    if (filteredActives.includes(tag)) {
      setFilteredActive(filteredActives.filter((filter) => filter !== tag));
    } else {
      setFilteredActive([...filteredActives, tag]);
    }
  };

  const renderTags = () =>
    tags.map((tag) => (
      <div className="m-1 text-skin-primary-light" key={tag} onClick={() => toggleTag(tag)} role="presentation">
        <Button
          onClick={() => null}
          className={`p-3 pb-1 pt-1 border border-skin-primary-light rounded-md transition duration-100 ${
            filteredActives.includes(tag) ? 'text-skin-white bg-skin-primary-light' : ''
          }`}>
          {tag}
        </Button>
      </div>
    ));
  return <div className="flex justify-center flex-wrap m-10 mt-1 mb-1"> {renderTags()} </div>;
};
