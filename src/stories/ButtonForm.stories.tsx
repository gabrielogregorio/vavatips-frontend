import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonForm from '../components/base/buttonForm';

export default {
  title: 'form/ButtonForm',
  component: ButtonForm,
} as ComponentMeta<typeof ButtonForm>;

const Template: ComponentStory<typeof ButtonForm> = (args) => <ButtonForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button Form',
  className: '',
  onClick: action('onClick'),
};
