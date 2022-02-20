import { ComponentStory, ComponentMeta } from '@storybook/react';
import HrComponent from '../components/base/hr';

export default {
  title: 'base/HrComponent',
  component: HrComponent,
} as ComponentMeta<typeof HrComponent>;

const Template: ComponentStory<typeof HrComponent> = (args) => <HrComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
