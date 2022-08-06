import { ComponentStory, ComponentMeta } from '@storybook/react';
import mockPosts from '@/mock/mockAllPosts.json';
import { PostCard } from '../components/widgets/postCard';

export default {
  component: PostCard,
  title: 'widgets/PostCard',
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ maxWidth: '800px' }}>
      <PostCard {...args} />
    </div>
  </div>
);

const FIRST_POSITION = 0;

export const Default = Template.bind({});
Default.args = {
  post: mockPosts.posts[FIRST_POSITION],
};
