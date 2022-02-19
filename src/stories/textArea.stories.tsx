/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextArea from '../components/base/textArea';

export default {
  title: 'Example/TextArea',
  component: TextArea,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'TextArea',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'TextArea',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'TextArea',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'TextArea',
};
