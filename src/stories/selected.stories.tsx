import { ComponentMeta, Story } from '@storybook/react';
import { TPropsSelectedBase, Selected } from '@/base/selected';
import { agents } from '@/data/data-valorant';
import { convertToSelectedRender } from '@/helpers/convertToSelectedData';
import { useForm } from 'react-hook-form';

export default {
  title: 'form/Selected',
  component: Selected,
} as ComponentMeta<typeof Selected>;

const Template: Story<TPropsSelectedBase> = (props) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return <Selected {...props} register={register} errors={errors} />;
};

export const Default: Story<TPropsSelectedBase> = Template.bind({});
Default.args = {
  name: 'Agente',
  text: 'Agente',
  render: convertToSelectedRender(agents()),
  status: 'default',
  disabled: false,
};
