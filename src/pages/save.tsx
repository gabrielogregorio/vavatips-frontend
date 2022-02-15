import LINKS from '@/data/links';
import navbarEnum from '@/interfaces/navbar';
import LayoutComponent from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Save];

const SaveScreen = () => (
  <LayoutComponent>
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type="save"
      mode="public"
      typeSelected={navbarEnum.Save}
      title="Posts Salvos"
    />
  </LayoutComponent>
);
export default SaveScreen;
