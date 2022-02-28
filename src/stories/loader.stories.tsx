import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from '../components/base/loader';

export default {
  title: 'base/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
  active: true,
};
