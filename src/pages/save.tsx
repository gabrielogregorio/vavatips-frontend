import LINKS from '@/data/links';
import navbarEnum from '@/interfaces/navbar';
import LayoutComponent from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Save];

export default function SaveScreen() {
  return (
    <LayoutComponent>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        type="save"
        typeSelected={navbarEnum.Save}
        typeSelectedAdmin={navbarEnum.None}
        title="Posts Salvos"
      />
    </LayoutComponent>
  );
}
