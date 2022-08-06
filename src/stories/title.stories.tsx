import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from '../components/base/title';

export default {
  component: Title,
  title: 'base/Title',
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Title of page',
};
