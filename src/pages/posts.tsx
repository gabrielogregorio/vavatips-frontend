import { LINKS } from '@/data/links';
import { Layout } from '@/layout/layout';
import { ContainerPosts } from '@/widgets/containerPosts';
import { navbarEnum } from '@/interfaces/navbar';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents, LINKS.Posts];

const Posts = () => (
  <Layout>
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type=""
      mode="public"
      typeSelected={navbarEnum.Posts}
      title="As melhores dicas de Valorant"
    />
  </Layout>
);
export default Posts;
