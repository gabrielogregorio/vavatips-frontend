import navbarEnum from '@/interfaces/navbar';
import LayoutComponent from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.ViewPosts, text: 'posts' },
];

const ViewPostsScreen = () => (
  <LayoutComponent>
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      mode="admin"
      type=""
      typeSelected={navbarEnum.ViewPosts}
      title="Todos os Posts"
    />
  </LayoutComponent>
);
export default ViewPostsScreen;
