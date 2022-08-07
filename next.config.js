const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  images: {
    domains: ['/', 'localhost', '127.0.0.1', 'backend-valorant.herokuapp.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
});
