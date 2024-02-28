const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/src/pages/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.github/**',
    '!**/.jest/**',
    '!**/.next/**',
    '!**/.nyc_output/**',
    '!**/.storybook/**',
    '!**/.vscode/**',
    '!**/coverage/**',
    '!**/cypress/**',
    '!**/public/**',
    '!**/storybook-static/**',
    '!**/.eslintrc.js/**',
    '!**/.prettierrc.js/**',
    '!**/jest.config.js/**',
    '!**/next.config.js/**',
    '!**/postcss.config.js/**',
    '!**/stylelint.config.js/**',
    '!**/tailwind.config.js/**',
    '!**/*.stories.tsx/**',
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

  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
