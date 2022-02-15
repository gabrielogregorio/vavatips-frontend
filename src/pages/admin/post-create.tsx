import LayoutComponent from '@/layout/layout';
import CreatePostManagement from '@/widgets/managmentPost';
import navbarEnum from '@/interfaces/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.PostCreate, text: 'criar' },
];

const CreatePostScreen = () => (
  <LayoutComponent>
    <CreatePostManagement breadcrumbs={breadcrumbs} mode="create" />
  </LayoutComponent>
);
export default CreatePostScreen;
