module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'deprecate',
    'no-loops',
    'jest-formatting',
    'promise',
    'jest',
    'jsx-a11y',
    'testing-library',
    'sonarjs',
    'cypress',
  ],
  extends: [
    'next/core-web-vitals',
    'plugin:cypress/recommended',
    'airbnb',
    'plugin:markdown/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jest-formatting/recommended',
    'plugin:promise/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',
    'no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],

    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unused-modules': [1, { unusedExports: true, ignoreExports: ['./src/pages', './src/stories'] }],
    'no-loops/no-loops': 2,
    indent: ['error', 2],
    'id-length': [2, { properties: 'never', min: 3 }],
  },

  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['./cypress/**'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['test/**'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: { 'jest/prefer-expect-assertions': 'off' },
    },
  ],
  env: {
    jest: true,
  },
  globals: {
    cy: true,
  },
};
