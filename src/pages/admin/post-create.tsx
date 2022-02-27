import Layout from '@/layout/layout';
import CreatePostManagement from '@/widgets/managmentPost';
import navbarEnum from '@/interfaces/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.PostCreate, text: 'criar' },
];

const CreatePostScreen = () => (
  <Layout>
    <CreatePostManagement breadcrumbs={breadcrumbs} mode="create" />
  </Layout>
);
export default CreatePostScreen;
