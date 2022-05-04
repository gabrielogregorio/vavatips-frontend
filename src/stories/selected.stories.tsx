import { ComponentMeta, Story } from '@storybook/react';
import { Selected } from '@/base/selected';
import { agents } from '@/data/data-valorant';
import { convertToSelectedRender } from '@/helpers/convertToSelectedData';
import { useForm } from 'react-hook-form';

export default {
  title: 'form/Selected',
  component: Selected,
} as ComponentMeta<typeof Selected>;

const Template: Story<typeof Selected> = (props) => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <Selected
      name={'Agente'}
      text={'Agente'}
      render={convertToSelectedRender(agents())}
      status={'default'}
      disabled={false}
      {...props}
      register={register}
      errors={errors}
    />
  );
};

export const Default: Story<typeof Selected> = Template.bind({});
Default.args = {};
