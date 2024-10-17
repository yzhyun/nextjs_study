/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*', // API 요청을 Tomcat 서버로 프록시
        },
      ];
    },
  };
  