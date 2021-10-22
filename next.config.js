/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    MOVIES_API_BASE_URL: process.env.MOVIES_API_BASE_URL,
    MOVIES_API_KEY: process.env.MOVIES_API_KEY,
  },
  images: {
    domains: ['image.tmdb.org'],
  },
};
