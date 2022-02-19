/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ErrorMsg from '../components/base/errorMsg';

export default {
  title: 'Example/ErrorMsg',
  component: ErrorMsg,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ErrorMsg>;

const Template: ComponentStory<typeof ErrorMsg> = (args) => <ErrorMsg {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'ErrorMsg',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'ErrorMsg',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'ErrorMsg',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'ErrorMsg',
};
