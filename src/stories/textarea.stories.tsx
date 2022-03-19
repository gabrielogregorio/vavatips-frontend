import { ComponentMeta, Story } from '@storybook/react';
import { IPropsTextArea, TextArea } from '@/base/textArea';
import { useState } from 'react';

export default {
  title: 'form/textarea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: Story<IPropsTextArea> = (props) => {
  const [localValue, setValue] = useState<string>('');
  const onChangeInput = (inputValue: string) => {
    setValue(inputValue);
  };
  return <TextArea {...props} value={localValue} setValue={(event) => onChangeInput(event)} />;
};

export const Default: Story<IPropsTextArea> = Template.bind({});
Default.args = {
  name: 'Agente',
  title: 'Agente',
  value: '',
};
