/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
    NETWORK_ADDRESS: "192.168.68.102:8545"
  }
}

module.exports = nextConfig
