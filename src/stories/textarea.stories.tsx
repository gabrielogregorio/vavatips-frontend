import { ComponentMeta, Story } from '@storybook/react';
import { TextArea } from '@/base/textArea';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'form/textarea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: Story<typeof TextArea> = (props) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return <TextArea name="Agente" title="Agente" {...props} errors={errors} register={register} />;
};

export const Default: Story<typeof TextArea> = Template.bind({});
Default.args = {};
