const { withSentryConfig } = require('@sentry/nextjs');
// const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const authToken = process.env.SENTRY_TOKEN;
const sentryWebpackPluginOptions = {
  authToken,
  silent: true,
};

const nextConfig = {
  images: {
    domains: ['/', 'localhost', '127.0.0.1', 'backend-valorant.herokuapp.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
};

// module.exports = withPWA(withSentryConfig(nextConfig, sentryWebpackPluginOptions));
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
