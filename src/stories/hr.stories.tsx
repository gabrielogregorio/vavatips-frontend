import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Hr } from '../components/base/hr';

export default {
  component: Hr,
  title: 'base/Hr',
} as ComponentMeta<typeof Hr>;

const Template: ComponentStory<typeof Hr> = (args) => <Hr {...args} />;

export const Default = Template.bind({});
Default.args = {};
