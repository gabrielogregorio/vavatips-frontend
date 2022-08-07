const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/src/pages/**', // [ *** IMPORTANT *** ] IGNORE PAGES, PAGES ARE TESTED IN CYPRESS
    '!**/*.d.ts', // ignore envs
    '!**/node_modules/**', // ignore packages node modules
    '!**/.github/**', // ignore github yml
    '!**/.jest/**', // ignore .env jest
    '!**/.next/**', // ignore build next
    '!**/.nyc_output/**', // ignore nyc coverage
    '!**/.storybook/**', // ignore storybook configs
    '!**/.vscode/**', // ignore vscode configs
    '!**/coverage/**', // ignore coverage from jest
    '!**/cypress/**', // ignore cypress configs and tests
    '!**/public/**', // ignore public files
    '!**/storybook-static/**', // ignore build storybook
    '!**/.eslintrc.js/**', // ignore eslint configs
    '!**/.prettierrc.js/**', // ignore prettier configs
    '!**/jest.config.js/**', // ignore jest configs
    '!**/next.config.js/**', // ignore next configs
    '!**/postcss.config.js/**', // ignore postcss from tailwind
    '!**/stylelint.config.js/**', // ignore stylelint configs
    '!**/tailwind.config.js/**', // ignore tailwind configs
    '!**/*.stories.tsx/**', // ignore ALL stories from storybook // NEEDS TEST STORYBOOK ? //
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/.jest/setEnvVars.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/cypress/',
    '/.storybook/',
    '/storybook-static/',
    '/coverage',
    '/.nyc_output',
    '/src/stories/',
  ],
  testTimeout: 20000,
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
