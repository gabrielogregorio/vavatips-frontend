import { screen } from '@testing-library/react';

const editPost = 'Editar um post';

export const expectTitlePost = () => expect(screen.getByRole('heading', { name: editPost })).toBeInTheDocument();
