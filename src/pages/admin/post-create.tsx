import { Layout } from '@/layout/layout';
import { CreatePostManagement } from '@/widgets/managmentPost';
import { navbarEnum } from '@/enums/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.PostCreate, text: 'criar' },
];

const CreatePost = () => (
  <Layout>
    <CreatePostManagement breadcrumbs={breadcrumbs} mode="create" />
  </Layout>
);
export default CreatePost;
