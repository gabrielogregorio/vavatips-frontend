/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonForm from '../components/base/buttonForm';

export default {
  title: 'Example/ButtonForm',
  component: ButtonForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ButtonForm>;

const Template: ComponentStory<typeof ButtonForm> = (args) => <ButtonForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'ButtonForm',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'ButtonForm',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'ButtonForm',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'ButtonForm',
};
