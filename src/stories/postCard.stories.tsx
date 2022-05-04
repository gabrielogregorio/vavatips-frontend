import { ComponentStory, ComponentMeta } from '@storybook/react';
import mockPosts from '@/mock/mockAllPosts.json';
import { PostCard } from '../components/widgets/postCard';

export default {
  title: 'widgets/PostCard',
  component: PostCard,
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ maxWidth: '800px' }}>
      <PostCard {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  post: mockPosts.posts[0],
};
