import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageCard } from '../components/widgets/imageCard';

export default {
  component: ImageCard,
  title: 'widgets/ImageCard',
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => <ImageCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'h-64"',
  href: '/posts',
  srcImage: '/images/maps/Ascent.webp',
  titleImage: 'Image Title',
};
