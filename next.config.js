/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['themoviedb.org', 'image.tmdb.org','api.themoviedb.org'],
  },
}

module.exports = nextConfig
