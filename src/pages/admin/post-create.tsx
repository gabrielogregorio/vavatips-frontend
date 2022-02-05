import React from 'react';
import LayoutComponent from '@/layout/layout';
import CreatePostManagement from '@/widgets/managmentPost';
import navbarEnum from '@/interfaces/navbar';

const breadcrumbs = [
  { url: navbarEnum.Dashboard, text: 'admin' },
  { url: navbarEnum.PostCreate, text: 'criar' },
];

export default function CreatePostScreen() {
  return (
    <LayoutComponent>
      <CreatePostManagement breadcrumbs={breadcrumbs} mode="create" />
    </LayoutComponent>
  );
}
