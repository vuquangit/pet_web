// https://jestjs.io/docs/getting-started

import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  // bail: 1,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.cy.{js,jsx,ts,tsx}',
    '!src/tests/**',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom', './src/tests/unit/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/unit/fileMock.js',
    '\\.(css|less|scss|sass|css?raw)$': 'identity-obj-proxy',
    '^.+\\.svg': '<rootDir>/src/tests/unit/svgrMock.tsx',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        babel: true,
        tsConfig: '<rootDir>/tsconfig.json',
      },
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.svg|.svg?url': '<rootDir>/src/tests/unit/fileTransformer.js',
  },
  transformIgnorePatterns: [],
}

export default config
