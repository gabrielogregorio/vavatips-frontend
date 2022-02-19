/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '../components/base/input';

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'Input',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Input',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Input',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Input',
};
