import { navbarEnum } from '@/enums/navbar';
import { Layout } from '@/layout/layout';
import { api } from '@/services/api';
import { ContainerPosts } from '@/widgets/containerPosts';
import { useEffect, useState } from 'react';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.ViewPosts, text: 'posts' },
];

const ViewPosts = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const resp = await api('/posts');
        const posts = await resp.data;
        setData(posts.posts);
        return 'ok';
      } catch (error) {
        return 'ooopss';
      }
    }
    getData();
  }, []);

  return (
    <Layout>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        mode="admin"
        typeSelected={navbarEnum.ViewPosts}
        title="Todos os Posts"
        posts={data}
        showTags={false}
      />
    </Layout>
  );
};
export default ViewPosts;
