import { TPostsProps } from '@/types/posts';
import { PostCard } from './postCard';

type IPostProps = {
  posts: TPostsProps[];
};

export const Posts = ({ posts }: IPostProps) => {
  function renderPost() {
    return posts.map((post) => (
      <div key={post.id}>
        <PostCard post={post} viewAdmin={false} />
      </div>
    ));
  }

  return <div className="flex flex-col">{renderPost()}</div>;
};
