/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoaderComponent from '../components/base/loader';

export default {
  title: 'Example/LoaderComponent',
  component: LoaderComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoaderComponent>;

const Template: ComponentStory<typeof LoaderComponent> = (args) => <LoaderComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'LoaderComponent',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'LoaderComponent',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'LoaderComponent',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'LoaderComponent',
};
