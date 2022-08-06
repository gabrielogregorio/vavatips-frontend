import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Input } from '@/base/input';

export default {
  component: Input,
  title: 'form/Input',
} as ComponentMeta<typeof Input>;

const Template: Story<typeof Input> = (props: unknown) => (
  <div>
    <Input
      isSubmitted={false}
      label="type} your name"
      name="name"
      status="default"
      placeholder=""
      errors={[]}
      register={null}
      disabled={false}
      type="password"
      {...props}
    />
  </div>
);

export const Default: Story<typeof Input> = Template.bind({});
Default.args = {};

export const Password = Template.bind({});
Password.args = {
  disabled: false,
  label: 'type your password',
  name: 'password',
  placeholder: '',
  status: 'default',
  type: 'password',
};

export const Email = Template.bind({});
Email.args = {
  disabled: false,
  label: 'type your email',
  name: 'email',
  placeholder: '',
  status: 'default',
  type: 'email',
};

export const Number = Template.bind({});
Number.args = {
  disabled: false,
  label: 'choice a number',
  name: 'number',
  placeholder: '',
  status: 'default',
  type: 'number',
};
