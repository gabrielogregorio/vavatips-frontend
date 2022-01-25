import React from 'react';

import CreatePostManagement from '../../components/widgets/managmentPost';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/PostCreate', text: 'criar' },
];

export default function CreatePostScreen() {
  return <CreatePostManagement breadcrumbs={breadcrumbs} mode="create" />;
}
