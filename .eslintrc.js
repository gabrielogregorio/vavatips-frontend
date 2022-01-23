module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [0],
    'react/require-default-props': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  extends: ['next/core-web-vitals', 'airbnb', 'prettier'],
};
