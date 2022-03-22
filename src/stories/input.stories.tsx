import React, { useState } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Input, TPropsInput } from '@/base/input';

export default {
  title: 'form/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: Story<TPropsInput> = (props) => {
  return (
    <div>
      <Input {...props} />
    </div>
  );
};

export const Default: Story<TPropsInput> = Template.bind({});
Default.args = {
  type: 'text',
  label: 'type your name',
  name: 'name',
  status: 'default',
  placeholder: '',
  disabled: false,
};

export const Password = Template.bind({});
Password.args = {
  disabled: false,
  type: 'password',
  label: 'type your password',
  name: 'password',
  placeholder: '',
  status: 'default',
};

export const Email = Template.bind({});
Email.args = {
  disabled: false,
  type: 'email',
  label: 'type your email',
  name: 'email',
  placeholder: '',
  status: 'default',
};

export const Number = Template.bind({});
Number.args = {
  disabled: false,
  type: 'number',
  label: 'choice a number',
  placeholder: '',
  name: 'number',
  status: 'default',
};
