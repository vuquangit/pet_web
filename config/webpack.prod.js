/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const paths = require('./paths')
const common = require('./webpack.common.js')
const isEnvProductionProfile = process.argv.includes('--profile')

module.exports = merge(common('production'), {
  mode: 'production',

  entry: paths.appIndexJs,

  output: {
    path: paths.appBuild,
    pathinfo: false,
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: paths.publicUrlOrPath,
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),

    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: paths.publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'))

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      },
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new JsonMinimizerPlugin(),
      // This is only used in production mode, minify your JavaScript.
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: isEnvProductionProfile,
          keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        // sourceMap: shouldUseSourceMap,
      }),
    ],

    // Automatically split vendor and commons
    splitChunks: {
      chunks: 'all',
      name: false,
    },

    // Keep the runtime chunk separated to enable long term caching
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
