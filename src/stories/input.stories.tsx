import React, { useState } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { Input, TPropsInput } from '@/base/input';

export default {
  title: 'form/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: Story<TPropsInput> = (props) => {
  const [localValue, setValue] = useState<string>('');
  const onChangeInput = (inputValue: string) => {
    setValue(inputValue);
  };
  return (
    <div>
      <Input {...props} value={localValue} setValue={onChangeInput} />
    </div>
  );
};

export const Default: Story<TPropsInput> = Template.bind({});
Default.args = {
  type: 'text',
  text: 'type your name',
  name: 'name',
  message: '',
  status: 'default',
  disabled: false,
};

export const Password = Template.bind({});
Password.args = {
  disabled: false,
  type: 'password',
  text: 'type your password',
  name: 'password',
  message: '',
  status: 'default',
};

export const Email = Template.bind({});
Email.args = {
  disabled: false,
  type: 'email',
  text: 'type your email',
  name: 'email',
  message: '',
  status: 'default',
};

export const Number = Template.bind({});
Number.args = {
  disabled: false,
  type: 'number',
  text: 'choice a number',
  name: 'number',
  message: '',
  status: 'default',
};
