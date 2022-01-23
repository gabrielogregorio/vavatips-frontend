import { navbarEnum, navbarEnumPublic } from '@/interfaces/navbar';
import ContainerPosts from '../../components/widgets/containerPosts';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/ViewPosts', text: 'posts' },
];

export default function ViewPostsScreen() {
  return (
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type=""
      typeSelected={navbarEnumPublic.None}
      typeSelectedAdmin={navbarEnum.ViewPosts}
      title="Todos os Posts"
    />
  );
}
