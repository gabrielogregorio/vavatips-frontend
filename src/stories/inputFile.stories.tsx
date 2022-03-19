import { ComponentMeta, Story } from '@storybook/react';
import { InputFile, inputFileType } from '../components/base/inputFile';

export default {
  title: 'form/inputFileType',
  component: InputFile,
} as ComponentMeta<typeof InputFile>;

const Template: Story<inputFileType> = (props) => {
  const onChangeInput = (event) => {
    //
  };
  return <InputFile {...props} onChange={onChangeInput} />;
};

export const Default: Story<inputFileType> = Template.bind({});
Default.args = {
  type: 'file',
  text: 'type your name',
  name: 'name',
};

export const Password = Template.bind({});
Password.args = {
  type: 'file',
  text: 'type your password',
  name: 'password',
};
