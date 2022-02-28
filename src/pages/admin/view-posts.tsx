import navbarEnum from '@/interfaces/navbar';
import Layout from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.ViewPosts, text: 'posts' },
];

const ViewPostsScreen = () => (
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
export default ViewPostsScreen;
