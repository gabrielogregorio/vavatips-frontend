import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImageCard from '../components/widgets/imageCard';

export default {
  title: 'widgets/ImageCard',
  component: ImageCard,
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => <ImageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: '/posts',
  srcImage: '/images/maps/Ascent.webp',
  titleImage: 'Image Title',
  heightImage: 'h-64"',
};
