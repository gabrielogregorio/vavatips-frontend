import navbarEnum from '@/interfaces/navbar';
import LayoutComponent from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

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
        typeSelected={navbarEnum.None}
        typeSelectedAdmin={navbarEnum.ViewPosts}
        title="Todos os Posts"
      />
    </LayoutComponent>
  );
}
