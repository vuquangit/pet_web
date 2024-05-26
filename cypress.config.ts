/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress'
import webpackConfig from './config/webpack.dev.js'

// https://docs.cypress.io/guides/references/configuration
export default defineConfig({
  projectId: 'rq4q3n',

  viewportWidth: 1366,
  viewportHeight: 768,

  retries: {
    runMode: 2,
    openMode: 0,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    supportFile: 'src/tests/e2e/support/component.tsx',
    specPattern: ['src/**/*.cy.{js,ts,jsx,tsx}'],
    indexHtmlFile: 'public/index.html',
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // e2e testing node events setup code

      require('@cypress/code-coverage/task')(on, config)

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
    supportFile: 'src/tests/e2e/support/e2e.ts',
    specPattern: 'src/tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
  },

  fileServerFolder: 'src/tests/e2e',
  fixturesFolder: 'src/tests/e2e/fixtures',
  supportFolder: 'src/tests/e2e/support',
  downloadsFolder: 'src/tests/e2e/downloadsFolder',
  screenshotsFolder: 'src/tests/e2e/screenshotsFolder',
  videosFolder: 'src/tests/e2e/videosFolder',
  video: false, // disable capture videos
  screenshotOnRunFailure: false, // disable take screenshots
  env: {},
})
