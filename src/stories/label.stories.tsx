import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Label } from '../components/base/label';

export default {
  title: 'form/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (props) => {
  return <Label {...props} />;
};

export const Default: ComponentStory<typeof Label> = Template.bind({});
Default.args = {
  name: 'name',
  text: 'Digite seu nome',
};
