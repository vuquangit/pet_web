/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { merge } = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const path = require('path')

const common = require('./webpack.common.js')
const paths = require('./paths')

const APP_PORT = process.argv
  .filter((item) => item.startsWith('--port='))
  .map((item) => item.split('=')[1])[0]
const PORT = parseInt(APP_PORT, 10) || 3000

const smp = new SpeedMeasurePlugin()

const mergedConfig = merge(common('development'), {
  mode: 'development',

  entry: [paths.appIndexJs],

  output: {
    path: paths.appBuild,
    publicPath: paths.publicUrlOrPath,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
  },

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    port: PORT,
    compress: true,
    hot: true,
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
  ],

  devtool: 'eval-source-map', // For development only

  watchOptions: {
    aggregateTimeout: 300, // Delay before rebuilding
    poll: 1000, // Check for changes every second
  },

  cache: {
    type: 'filesystem', // Enables persistent caching to disk
    buildDependencies: {
      config: [__filename], // Cache invalidation based on the config file itself
    },
    cacheDirectory: path.resolve(__dirname, '.webpack-cache'), // Custom cache directory (optional)
    compression: 'brotli', // Compress the cache to save space
    maxMemoryGenerations: 1, // Reduce memory usage by keeping fewer generations in memory
  },
})

// The only difference to how you normally use webpack-merge is that you need
// to `smp.wrap` whatever your final config is
module.exports = smp.wrap(mergedConfig)
