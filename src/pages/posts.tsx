import LINKS from '@/data/links';
import LayoutComponent from '../components/layout/layout';
import ContainerPosts from '../components/widgets/containerPosts';
import navbarEnum from '../interfaces/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents, LINKS.Posts];

export default function HomeScreen() {
  return (
    <LayoutComponent>
      <ContainerPosts
        breadcrumbs={breadcrumbs}
        type=""
        typeSelected={navbarEnum.Posts}
        typeSelectedAdmin={navbarEnum.None}
        title="As melhores dicas de Valorant"
      />
    </LayoutComponent>
  );
}
