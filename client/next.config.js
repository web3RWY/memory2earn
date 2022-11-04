/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env : {
    NETWORK_ADDRESS: "127.0.0.1:8545",
    INFURA_API_KEY: "ac8fc90f805a4520b45fd622c8715dfa",
    MONGODB_URI: "mongodb+srv://memory2earn:Memory2EarnDB@memory2earn.sqwishy.mongodb.net/memory2earn?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
