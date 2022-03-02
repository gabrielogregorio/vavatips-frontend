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
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', // packages
    '<rootDir>/.next/', // build next
    '<rootDir>/cypress/', // cypress
    '<rootDir>/.storybook/', // storybook
    '<rootDir>/src/stories/', // stories from storybook
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',

    '^@/base/(.*)$': '<rootDir>/src/components/base/$1',
    '^@/layout/(.*)$': '<rootDir>/src/components/layout/$1',
    '^@/widgets/(.*)$': '<rootDir>/src/components/widgets/$1',

    '^@/contexts/(.*)$': '<rootDir>/src/core/contexts/$1',
    '^@/data/(.*)$': '<rootDir>/src/core/data/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/core/helpers/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/core/hooks/$1',
    '^@/services/(.*)$': '<rootDir>/src/core/services/$1',
    '^@/schemas/(.*)$': '<rootDir>/src/core/schemas/$1',

    '^@/mock/(.*)$': '<rootDir>/src/tests/mock/$1',
    '^@/utils/(.*)$': '<rootDir>/src/tests/utils/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',

    '^@/types/(.*)$': '<rootDir>/src/core/types/$1',
    '^@/enums/(.*)$': '<rootDir>/src/core/enums/$1',

    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/.jest/setEnvVars.js'],
};
