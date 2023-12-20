/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  trailingSlash: true,
  output: 'export',

  env: {
    AUTH_URL: process.env.AUTH_URL,
    ATTENDANCE_URL: process.env.ATTENDANCE_URL,
    LIB_URL: '',
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.zsmozaika.cz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
