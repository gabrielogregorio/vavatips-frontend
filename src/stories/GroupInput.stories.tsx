/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GroupInput from '../components/base/groupInput';

export default {
  title: 'Example/GroupInput',
  component: GroupInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof GroupInput>;

const Template: ComponentStory<typeof GroupInput> = (args) => <GroupInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'GroupInput',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'GroupInput',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'GroupInput',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'GroupInput',
};
