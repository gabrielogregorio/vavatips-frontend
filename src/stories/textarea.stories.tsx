import { ComponentMeta, Story } from '@storybook/react';
import { IPropsTextArea, TextArea } from '@/base/textArea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'form/textarea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: Story<IPropsTextArea> = (props) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return <TextArea {...props} errors={errors} register={register} />;
};

export const Default: Story<IPropsTextArea> = Template.bind({});
Default.args = {
  name: 'Agente',
  title: 'Agente',
};
