import { navbarEnum } from '@/enums/navbar';
import { useViewAdminPosts } from '@/hooks/useViewAdminPosts';
import { Layout } from '@/layout/layout';
import { ContainerPosts } from '@/widgets/containerPosts';
import { ReactElement } from 'react';

const breadcrumbs = [
  { text: 'admin', url: navbarEnum.Dashboard },
  { text: 'posts', url: navbarEnum.ViewPosts },
];

const ViewPosts = (): ReactElement => {
  const { posts } = useViewAdminPosts();

  return (
    <Layout>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        mode="admin"
        typeSelected={navbarEnum.ViewPosts}
        title="Todos os Posts"
        posts={posts}
        showTags={false}
      />
    </Layout>
  );
};
export default ViewPosts;
