import LINKS from '@/data/links';
import navbarEnum from '@/interfaces/navbar';
import LayoutComponent from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Tested];

const TestScreen = () => (
  <LayoutComponent>
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type="tested"
      mode="public"
      typeSelected={navbarEnum.Tested}
      title="Posts para testar"
    />
  </LayoutComponent>
);
export default TestScreen;
