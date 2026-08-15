/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1997",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1997",
        pathname: "/temp/**",
      },
    ],
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://uahub-17tb.onrender.com/api/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
