import { ComponentStory, ComponentMeta } from '@storybook/react';
import ErrorMsg from '../components/base/errorMsg';

export default {
  title: 'base/ErrorMsg',
  component: ErrorMsg,
} as ComponentMeta<typeof ErrorMsg>;

const Template: ComponentStory<typeof ErrorMsg> = (args) => <ErrorMsg {...args} />;

export const Default = Template.bind({});
Default.args = {
  msg: 'Erro ao fazer login',
};
