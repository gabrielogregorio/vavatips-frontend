import LINKS from '@/data/links';
import navbarEnum from '@/interfaces/navbar';
import Layout from '@/layout/layout';
import ContainerPosts from '@/widgets/containerPosts';

const breadcrumbs = [LINKS.inicio, LINKS.Save];

const SaveScreen = () => (
  <Layout>
    <ContainerPosts
      breadcrumbs={breadcrumbs}
      type="save"
      mode="public"
      typeSelected={navbarEnum.Save}
      title="Posts Salvos"
    />
  </Layout>
);
export default SaveScreen;
