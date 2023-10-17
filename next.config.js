/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    API_SECRET: process.env.API_SECRET,
    API_JWT_SECRET: process.env.API_JWT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

module.exports = nextConfig;
