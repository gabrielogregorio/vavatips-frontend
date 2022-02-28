import { ComponentMeta, Story } from '@storybook/react';
import { IPropsTextArea, TextArea } from '../components/base/textArea';

export default {
  title: 'form/textarea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: Story<IPropsTextArea> = (props) => {
  const onChangeInput = () => {};
  return <TextArea {...props} setValue={onChangeInput} />;
};

export const Default: Story<IPropsTextArea> = Template.bind({});
Default.args = {
  name: 'Agente',
  title: 'Agente',
  value: '',
};
