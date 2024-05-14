/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

const APP_PORT = process.argv.filter(item => item.startsWith('--port=')).map(item => item.split('=')[1])[0]
const PORT = parseInt(APP_PORT, 10) || 3000;

module.exports = merge(common('development'), {
  mode: 'development',

  entry: [paths.appIndexJs, require.resolve('webpack-dev-server/client')],

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
    // inline: true,
    // contentBase: paths.appBuild,
    // publicPath: paths.publicUrlOrPath,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
})
