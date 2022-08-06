import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Label } from '../components/base/label';

export default {
  component: Label,
  title: 'form/Label',
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (props) => <Label {...props} />;

export const Default: ComponentStory<typeof Label> = Template.bind({});
Default.args = {
  name: 'name',
  text: 'Digite seu nome',
};
