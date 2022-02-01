import { navbarEnum, navbarEnumPublic } from '@/interfaces/navbar';
import LayoutComponent from '../../components/layout/layout';
import ContainerPosts from '../../components/widgets/containerPosts';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.ViewPosts, text: 'posts' },
];

export default function ViewPostsScreen() {
  return (
    <LayoutComponent>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        type=""
        typeSelected={navbarEnumPublic.None}
        typeSelectedAdmin={navbarEnum.ViewPosts}
        title="Todos os Posts"
      />
    </LayoutComponent>
  );
}
