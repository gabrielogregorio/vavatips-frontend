import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TagsFixFilters } from '../components/widgets/tagsFixFilters';

export default {
  component: TagsFixFilters,
  title: 'widgets/TagsFixFilters',
} as ComponentMeta<typeof TagsFixFilters>;

const Template: ComponentStory<typeof TagsFixFilters> = (args) => <TagsFixFilters {...args} />;

export const Default = Template.bind({});
Default.args = {
  agent: 'Killjoy',
  map: 'Breeze',
};
