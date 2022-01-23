import LoaderComponent from '@/base/loader';
import { propsInterfaceContaienrPosts } from '@/interfaces/posts';
import Posts from './postsItem';
import PostTags from './tags';
import TagsFixFilters from './tagsFixFilters';

export default function ContainerPosts({ queryUrl, activeLoader, posts }: propsInterfaceContaienrPosts) {
  return (
    <div className="containerPost">
      <TagsFixFilters queryUrl={queryUrl} />
      <PostTags />
      <LoaderComponent active={activeLoader} />
      <Posts posts={posts} />
    </div>
  );
}
