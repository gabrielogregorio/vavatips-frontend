const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
});

const nextConfig = {
  images: {
    domains: ['/', 'localhost', '127.0.0.1', 'backend-valorant.herokuapp.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

const ENABLE_BUNDLE = false;
if (ENABLE_BUNDLE) {
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = nextConfig;
}
