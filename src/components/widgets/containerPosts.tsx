import LoaderComponent from '../base/loader';
import Posts from './postsItem';
import PostTags from './tags';
import TagsFixFilters from './tagsFixFilters';

interface propsInterface {
  queryUrl: any;
  activeLoader: boolean;
  posts: postsProps[];
}

export default function ContainerPosts({ queryUrl, activeLoader, posts }: propsInterface) {
  return (
    <div className="containerPost">
      <TagsFixFilters queryUrl={queryUrl} />
      <PostTags />
      <LoaderComponent active={activeLoader} />
      <Posts posts={posts} />
    </div>
  );
}
