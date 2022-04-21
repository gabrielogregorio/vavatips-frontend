import LINKS from '@/data/links.json';
import { navbarEnum } from '@/enums/navbar';
import { Layout } from '@/layout/layout';
import { Api } from '@/services/api';
import { TPostsProps } from '@/types/posts';
import { ContainerPosts } from '@/widgets/containerPosts';
import { useEffect, useState } from 'react';
import { getPostsTested } from '../core/services/handlePosts';

const breadcrumbs = [LINKS.inicio, LINKS.Tested];

export const getStaticProps = async () => {
  const resp = await Api.get('/posts');
  const { posts } = await resp.data;

  return {
    props: {
      posts,
    },
  };
};

const Tested = ({ posts }: { posts: TPostsProps[] }) => {
  const [postsFiltered, setPostsFiltered] = useState<any[]>([]);

  useEffect(() => {
    const ids = getPostsTested();
    setPostsFiltered(posts.filter((post) => ids.includes(post.id)));
  }, [posts]);

  return (
    <Layout>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        mode="public"
        typeSelected={navbarEnum.Tested}
        title="Posts para testar"
        posts={postsFiltered}
      />
    </Layout>
  );
};
export default Tested;
