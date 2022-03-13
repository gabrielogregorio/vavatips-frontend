import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Footer } from '../components/layout/footer';

export default {
  title: 'layouts/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};
