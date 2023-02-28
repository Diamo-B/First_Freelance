/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    staticFolder: 'public', // default value is 'public'
  },
}
  
module.exports = nextConfig;
