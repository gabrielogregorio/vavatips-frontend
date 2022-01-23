import LINKS from '@/data/links';
import { navbarEnum, navbarEnumPublic } from '@/interfaces/navbar';
import ContainerPosts from '../components/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Tested];

export default function TestScreen() {
  return (
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type="tested"
      typeSelected={navbarEnumPublic.Tested}
      typeSelectedAdmin={navbarEnum.None}
      title="Posts para testar"
    />
  );
}
