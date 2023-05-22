/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vacancies/page=1',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
