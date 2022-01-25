import CreatePostManagement from '../../components/widgets/managmentPost';

const breadcrumbs = [
  { url: '/dashboard', text: 'administrativo' },
  { url: '/dashboard', text: 'editar' },
];

export default function EditPostScreen() {
  return <CreatePostManagement breadcrumbs={breadcrumbs} mode="edit" />;
}
