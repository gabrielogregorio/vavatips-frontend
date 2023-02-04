import { Layout } from '@/layout/layout';
import { CreatePostManagement } from '@/widgets/managmentPost';
import { navbarEnum } from '@/enums/navbar';
import { ReactElement } from 'react';

const breadcrumbs = [
  { text: 'admin', url: navbarEnum.Dashboard },
  { text: 'editar', url: navbarEnum.Dashboard },
];

const EditPost = (): ReactElement => (
  <Layout>
    <CreatePostManagement breadcrumbs={breadcrumbs} mode="edit" />
  </Layout>
);
export default EditPost;
