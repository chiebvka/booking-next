/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports ={
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
  }
}
