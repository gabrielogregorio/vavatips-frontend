import { postsProps } from '@/interfaces/posts';

const mockPost: postsProps = {
  id: '',
  user: { id: '', username: '', image: '' },
  description: '',
  title: '',
  imgs: [{ id: '', image: '', description: '' }],
  tags: {
    map: '',
    agent: '',
    ability: '',
    moment: '',
    difficult: '',
    side: '',
    mapPosition: '',
  },
};

export default mockPost;
