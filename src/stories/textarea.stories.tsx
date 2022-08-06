import { ComponentMeta, Story } from '@storybook/react';
import { TextArea } from '@/base/textArea';
import { useForm } from 'react-hook-form';

export default {
  component: TextArea,
  title: 'form/textarea',
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
