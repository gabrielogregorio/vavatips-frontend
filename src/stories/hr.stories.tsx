import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HrComponent } from '../components/base/hr';

export default {
  component: HrComponent,
  title: 'base/Hr',
} as ComponentMeta<typeof HrComponent>;

const Template: ComponentStory<typeof HrComponent> = (args) => <HrComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
