import LINKS from '@/data/links';
import navbarEnum from '@/interfaces/navbar';
import LayoutComponent from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Tested];

export default function TestScreen() {
  return (
    <LayoutComponent>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        type="tested"
        typeSelected={navbarEnum.Tested}
        typeSelectedAdmin={navbarEnum.None}
        title="Posts para testar"
      />
    </LayoutComponent>
  );
}
