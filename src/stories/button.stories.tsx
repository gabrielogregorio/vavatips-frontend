import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '../components/base/button';

export default {
  component: Button,
  title: 'base/Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'tested',
  className: '',
  disabled: false,
  onClick: action('onClick'),
};
