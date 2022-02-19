/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputFile from '../components/base/inputFile';

export default {
  title: 'Example/InputFile',
  component: InputFile,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputFile>;

const Template: ComponentStory<typeof InputFile> = (args) => <InputFile {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'InputFile',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'InputFile',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'InputFile',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'InputFile',
};
