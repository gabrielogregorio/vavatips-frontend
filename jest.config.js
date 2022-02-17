module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/cypress/**',
    '!**/jest.config.js**',
    '!**/jest.setup.js**',
    '!**/stylelint.config.js**',
    '!**/postcss.config.js**',
    '!**/tailwind.config.js**',
    '!**/next.config.js**',
    '!**/.eslintrc.js**',
    '!**/.prettierrc.js**',
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

    '^@/interfaces/(.*)$': '<rootDir>/src/interfaces/$1',

    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/cypress/'],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/.jest/setEnvVars.js'],
};
