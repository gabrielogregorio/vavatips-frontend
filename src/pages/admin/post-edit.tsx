import LayoutComponent from '../../components/layout/layout';
import CreatePostManagement from '../../components/widgets/managmentPost';
import { navbarEnum } from '../../interfaces/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.Dashboard, text: 'editar' },
];

export default function EditPostScreen() {
  return (
    <LayoutComponent>
      {' '}
      <CreatePostManagement breadcrumbs={breadcrumbs} mode="edit" />
    </LayoutComponent>
  );
}
