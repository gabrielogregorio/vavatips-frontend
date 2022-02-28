import Layout from '@/layout/layout';
import CreatePostManagement from '@/widgets/managmentPost';
import navbarEnum from '@/interfaces/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'editar' },
];

const EditPostScreen = () => (
  <Layout>
    <CreatePostManagement breadcrumbs={breadcrumbs} mode="edit" />
  </Layout>
);
export default EditPostScreen;
