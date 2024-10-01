import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      // resolve problem with typescript aliases
      config.resolve.alias = {
        ...config.resolve?.alias,
        // ...tsconfigResolveAliases(path.resolve(__dirname, '../tsconfig.json')),
      }

      config.resolve.plugins = [
        // ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ]

      // @ts-ignore
      config.resolve.extensions.push('.ts', '.tsx')
    }

    // @ts-ignore
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1, // We always need to apply postcss-loader before css-loader
            modules: {
              auto: /\.module\.scss$/, // true
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        {
          loader: 'postcss-loader', // required for tailwind
          options: {
            implementation: require('postcss'), // postcss 8
            postcssOptions: {
              config: path.resolve(__dirname, '../postcss.config.js'),
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            // sourceMap: true,
            // ...sassLoaderOptions,
            implementation: require.resolve('sass'), // dart sass
          },
        },
      ],
    })

    // // SVG config
    // // modify storybook's file-loader rule to avoid conflicts with our svgConfig
    // const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test('.svg'));
    // fileLoaderRule.exclude = /\.svg$/;
    // svgConfig(config);

    return config
  },
}
export default config
