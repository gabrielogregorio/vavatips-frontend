import { navbarEnum } from '@/enums/navbar';
import { Layout } from '@/layout/layout';
import { ContainerPosts } from '@/widgets/containerPosts';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.ViewPosts, text: 'posts' },
];

const ViewPosts = () => (
  <Layout>
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      mode="admin"
      type=""
      typeSelected={navbarEnum.ViewPosts}
      title="Todos os Posts"
    />
  </Layout>
);
export default ViewPosts;
