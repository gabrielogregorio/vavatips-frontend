import LINKS from '@/data/links.json';
import { navbarEnum } from '@/enums/navbar';
import { Layout } from '@/layout/layout';
import { api } from '@/services/api';
import { TPostsProps } from '@/types/posts';
import { ContainerPosts } from '@/widgets/containerPosts';
import { useEffect, useState } from 'react';
import { getPostsSave } from '../core/services/handlePosts';

const breadcrumbs = [LINKS.inicio, LINKS.Save];

export async function getStaticProps() {
  const resp = await api('/posts');
  const { posts } = await resp.data;

  return {
    props: {
      posts,
    },
  };
}

const Save = ({ posts }: { posts: TPostsProps[] }) => {
  const [postsFiltereds, setPostsFiltereds] = useState<TPostsProps[]>([]);

  useEffect(() => {
    setPostsFiltereds(posts.filter((post) => getPostsSave().includes(post.id)));
  }, [posts]);

  return (
    <Layout>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        mode="public"
        typeSelected={navbarEnum.Save}
        title="Posts Salvos"
        posts={postsFiltereds}
      />
    </Layout>
  );
};
export default Save;
