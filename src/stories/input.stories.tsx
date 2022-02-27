import React, { Props, useState } from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import Input, { PropsInterfaceInput } from '../components/base/input';

export default {
  title: 'form/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: Story<PropsInterfaceInput> = (props) => {
  const [localValue, setValue] = useState<string>('');
  const onChangeInput = (inputValue: string) => {
    setValue(inputValue);
  };
  return <Input {...props} value={localValue} setValue={onChangeInput} />;
};

export const Default: Story<PropsInterfaceInput> = Template.bind({});
Default.args = {
  disabled: false,
  type: 'text',
  text: 'type your name',
  name: 'name',
};

export const Password = Template.bind({});
Password.args = {
  disabled: false,
  type: 'password',
  text: 'type your password',
  name: 'password',
};

export const Email = Template.bind({});
Email.args = {
  disabled: false,
  type: 'email',
  text: 'type your email',
  name: 'email',
};

export const Number = Template.bind({});
Number.args = {
  disabled: false,
  type: 'number',
  text: 'choice a number',
  name: 'number',
};
