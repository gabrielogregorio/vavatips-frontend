import { ComponentMeta, Story } from '@storybook/react';
import { InputFile } from '../components/base/inputFile';

export default {
  title: 'form/inputFileType',
  component: InputFile,
} as ComponentMeta<typeof InputFile>;

const Template: Story<typeof InputFile> = (props) => {
  const onChangeInput = (event) => {};
  return <InputFile type="file" name="name" text="" {...props} onChange={onChangeInput} />;
};

export const Default: Story<typeof InputFile> = Template.bind({});
Default.args = {};
