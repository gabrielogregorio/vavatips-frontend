import LINKS from '@/data/links';
import LayoutComponent from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';
import navbarEnum from '@/interfaces/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents, LINKS.Posts];

const HomeScreen = () => (
  <LayoutComponent>
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type=""
      mode="public"
      typeSelected={navbarEnum.Posts}
      title="As melhores dicas de Valorant"
    />
  </LayoutComponent>
);
export default HomeScreen;
