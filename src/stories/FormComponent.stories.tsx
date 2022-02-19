/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FormComponent from '../components/base/Form';

export default {
  title: 'Example/FormComponent',
  component: FormComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FormComponent>;

const Template: ComponentStory<typeof FormComponent> = (args) => <FormComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'FormComponent',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'FormComponent',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'FormComponent',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'FormComponent',
};
