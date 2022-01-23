import LINKS from '@/data/links';
import { navbarEnum, navbarEnumPublic } from '@/interfaces/navbar';
import ContainerPosts from '../components/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents, LINKS.Posts];

export default function HomeScreen() {
  return (
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type=""
      typeSelected={navbarEnumPublic.Posts}
      typeSelectedAdmin={navbarEnum.None}
      title="As melhores dicas de Valorant"
    />
  );
}
