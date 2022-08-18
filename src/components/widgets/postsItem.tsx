import { TPostsProps } from '@/types/posts';
import { ReactElement } from 'react';
import { ErrorBoundary } from './errorBoundary';
import { PostCard } from './postCard';

type IPostProps = {
  posts: TPostsProps[];
};

export const Posts = ({ posts }: IPostProps): ReactElement => (
  <div className="flex flex-col ">
    {posts.map((post) => {
      if (!post) {
        return null;
      }

      return (
        <div key={post?.id}>
          <ErrorBoundary>
            <PostCard post={post} />
          </ErrorBoundary>
        </div>
      );
    })}
  </div>
);
