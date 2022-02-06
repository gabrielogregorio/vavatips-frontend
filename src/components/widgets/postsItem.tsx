import { postsProps } from '@/interfaces/posts';
import PostCard from './postCard';

interface postPropsInterface {
  posts: postsProps[];
}

export default function Posts({ posts }: postPropsInterface) {
  function renderPost() {
    return posts.map((post) => (
      <div key={post.id}>
        <PostCard post={post} viewAdmin={false} />
      </div>
    ));
  }

  return <div className="flex flex-col">{renderPost()}</div>;
}
