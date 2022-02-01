import LINKS from '@/data/links';
import { navbarEnum, navbarEnumPublic } from '@/interfaces/navbar';
import LayoutComponent from '../components/layout/layout';
import ContainerPosts from '../components/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Save];

export default function SaveScreen() {
  return (
    <LayoutComponent>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        type="save"
        typeSelected={navbarEnumPublic.Save}
        typeSelectedAdmin={navbarEnum.None}
        title="Posts Salvos"
      />
    </LayoutComponent>
  );
}
