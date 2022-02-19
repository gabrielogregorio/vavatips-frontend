import * as NextImage from 'next/image';
import '../src/styles/global.css';

// Load optimized images
const OriginalNextImage = NextImage.default;

// configs based in https://theodorusclarence.com/blog/nextjs-storybook-tailwind

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};
