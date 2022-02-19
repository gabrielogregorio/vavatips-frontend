/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImageCard from '../components/widgets/imageCard';

export default {
  title: 'Example/ImageCard',
  component: ImageCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => <ImageCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: 'ImageCard',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'ImageCard',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'ImageCard',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'ImageCard',
};
