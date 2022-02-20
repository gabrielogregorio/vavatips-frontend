import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoaderComponent from '../components/base/loader';

export default {
  title: 'base/LoaderComponent',
  component: LoaderComponent,
} as ComponentMeta<typeof LoaderComponent>;

const Template: ComponentStory<typeof LoaderComponent> = (args) => <LoaderComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  active: true,
};
