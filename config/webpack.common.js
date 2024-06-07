/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = true

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isStaging = webpackEnv === 'staging'
  const isEnvProduction = webpackEnv === 'production' || isStaging

  return {
    // Stop compilation early in production
    bail: isEnvProduction,

    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : 'cheap-module-source-map',

    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
            title: 'App',
            favicon: paths.favicon,
            manifest: paths.manifest,
            publicPath: paths.publicUrlOrPath,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined,
        ),
      ),

      // Makes some environment variables available to the JS code.
      new Dotenv({
        path: isStaging
          ? '.env.staging'
          : isEnvDevelopment
            ? './.env.development'
            : './.env.production',
      }),

      // Copies files from target to destination folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.appPublic,
            globOptions: {
              ignore: [
                '*.DS_Store',
                '**/index.html',
                // isEnvProduction && '**/service-worker.js',
              ].filter(Boolean),
            },
          },
        ],
      }),
    ],

    // Determine how modules within the project are treated
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          exclude: /node_modules/,
          use: isEnvDevelopment
            ? ['@jsdevtools/coverage-istanbul-loader', 'ts-loader'] // cypress coverage
            : 'ts-loader',
        },

        // JavaScript: Use Babel to transpile JavaScript files
        {
          test: /\.(js, jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },

        // CSS
        {
          test: /\.(scss|css)$/,
          exclude: /\.module.(scss|css)$/,
          use: [
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isEnvDevelopment && shouldUseSourceMap,
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isEnvDevelopment && shouldUseSourceMap,
                sassOptions: {
                  includePaths: [paths.appSrc, 'node_modules'],
                },
              },
            },
            {
              // process tailwind stuff
              // https://webpack.js.org/loaders/postcss-loader/
              loader: 'postcss-loader',
              options: {
                sourceMap: isEnvDevelopment,
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    // add addtional postcss plugins here
                    // easily find plugins at https://www.postcss.parts/
                  ],
                },
              },
            },
          ],
        },

        // SCSS MODULES
        {
          test: /\.module\.(scss|css)$/i,
          use: [
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
                sourceMap: isEnvProduction && shouldUseSourceMap,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
              },
            },
          ],
        },

        // LESS
        {
          test: /\.less$/,
          use: [
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: {
                    hack: `true; @import "${paths.customThemeAntd}";`,
                  },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },

        // Images: Copy image files to build folder
        {
          test: /\.(ico|gif|png|jpg|jpeg|bmp)$/i,
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/images/[name].[ext]',
            publicPath: paths.publicUrlOrPath,
          },
        },

        // Fonts: copy font files to build folder
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          dependency: { not: ['url'] },
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/fonts/[name].[ext]',
            publicPath: paths.publicUrlOrPath,
          },
        },

        // SVG
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              },
            },
          ],
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?
        },
      ],
    },

    resolve: {
      modules: [paths.appSrc, paths.appNodeModules],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': paths.appSrc,
      },
      plugins: [],
    },
  }
}
