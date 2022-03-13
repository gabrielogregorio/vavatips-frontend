import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TagsFixFilters } from '../components/widgets/tagsFixFilters';

export default {
  title: 'widgets/TagsFixFilters',
  component: TagsFixFilters,
} as ComponentMeta<typeof TagsFixFilters>;

const Template: ComponentStory<typeof TagsFixFilters> = (args) => {
  return <TagsFixFilters {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  queryUrl: {
    agent: 'Killjoy',
    map: 'Breeze',
    type: 'tested',
    page: '1',
    isReady: true,
  },
};
