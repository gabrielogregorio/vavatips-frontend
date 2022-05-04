import React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Input, typeInputColors } from '@/base/input';

export default {
  title: 'form/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: Story<typeof Input> = (props: unknown) => {
  return (
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
};

export const Default: Story<typeof Input> = Template.bind({});
Default.args = {};

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
