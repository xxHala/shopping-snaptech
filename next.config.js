/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  headers: [
    {
      key: 'Cache-Control',
      value: 'max-age=0',
    }
  ],


  images: {
    domains: ['images.pexels.com', 'ibb.co', 'i.ibb.co', 'www.google.com', 'via.placeholder.com', 'fakestoreapi.com'],
    dangerouslyAllowSVG: true
  },

  webpack: (config, { dev }) => {
    // Enables absolute paths for dependencies within the src directory.
    config.resolve.modules.push(path.resolve('./src'))

    if (dev) {
      // Displays ESLint errors/warnings when running the dev server.
      config.plugins.push(
        new ESLintPlugin({
          emitWarning: true,
          emitError: true,
          extensions: ['.js'],
          exclude: ['node_modules', '.next', 'out']
        })
      )
    }

    // Adds support for SVGR which transforms SVG assets into
    // ready to use components.
    config.module.rules.push({
      test: /\.svg$/,
      loader: '@svgr/webpack'
    })

    return config
  },

  async rewrites() {
    return [
      {
        source: '/:slug/:id',
        destination: '/[slug]/[id]',
      },
    ];
  },

}


module.exports = nextConfig
