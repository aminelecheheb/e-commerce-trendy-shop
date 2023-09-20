/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "res.cloudinary.com",
      "https://strapi-dolley.onrender.com",
      "https://res.cloudinary.com/djz4izmok/image/upload",
    ],
  },
};

module.exports = nextConfig;
