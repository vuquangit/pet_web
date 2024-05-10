/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.tsx'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath: '/',
  favicon: resolveApp('public/favicon.ico'),
  manifest: resolveApp('public/manifest.json'),
  customThemeAntd: resolveApp('src/styles/vendor/ant/index.less'),
}
