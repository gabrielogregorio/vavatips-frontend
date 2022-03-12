import { ComponentMeta, Story } from '@storybook/react';
import { IPropsTextArea, TextArea } from '@/base/textArea';

export default {
  title: 'form/textarea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: Story<IPropsTextArea> = (props) => {
  return <TextArea {...props} setValue={() => null} />;
};

export const Default: Story<IPropsTextArea> = Template.bind({});
Default.args = {
  name: 'Agente',
  title: 'Agente',
  value: '',
};
