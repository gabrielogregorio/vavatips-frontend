import { TPostsProps } from '@/types/posts';
import { ErrorBoundary } from './errorBoundary';
import { PostCard } from './postCard';

type IPostProps = {
  posts: TPostsProps[];
};

export const Posts = ({ posts }: IPostProps) => (
  <div className="flex flex-col ">
    {posts.map((post) => (
      <div key={post.id}>
        <ErrorBoundary>
          <PostCard post={post} />
        </ErrorBoundary>
      </div>
    ))}
  </div>
);
