/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'gogocdn.net',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'img.flixhq.to',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
          },

        ],
      },
}

module.exports = nextConfig
