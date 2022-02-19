/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HrComponent from '../components/base/hr';

export default {
  title: 'Example/HrComponent',
  component: HrComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HrComponent>;

const Template: ComponentStory<typeof HrComponent> = (args) => <HrComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'HrComponent',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'HrComponent',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'HrComponent',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'HrComponent',
};
