
module.exports = {
  reactStrictMode: true,
  // https://nextjs.org/docs/api-reference/next/image#loader-configuration
  images: {
    deviceSizes: [768, 1024], // 768: md, 1024: lg
    path: '/img/myaccount/assets',
  },
  rewrites() {
    return [
      {
        source: '/img/myaccount/assets/:path*',
        destination: '/_next/image/:path*',
      },
    ]
  },
}
