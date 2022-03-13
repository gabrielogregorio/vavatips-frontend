import { TPostsProps } from '@/types/posts';
import { PostCard } from './postCard';

type IPostProps = {
  posts: TPostsProps[];
};

export const Posts = ({ posts }: IPostProps) => (
  <div className="flex flex-col">
    {posts.map((post) => (
      <div key={post.id}>
        <PostCard post={post} />
      </div>
    ))}
  </div>
);
