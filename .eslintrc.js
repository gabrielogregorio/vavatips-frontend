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

    // this doesn't make any sense in react projects, it just pollutes the imports!
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',

    // the <Image from Next tag is shit for styling, I'll use it when they fix the component by deleting all the predefined styles.
    // next js also requires manually configuring each server the project can receive images from, and the allow from any site feature is not yet available with "*"
    // And to finalize, this component causes slowing in all images in valorant-tips-api. Bug without solution in github.
    '@next/next/no-img-element': 'off',
  },
  extends: ['next/core-web-vitals', 'airbnb', 'prettier'],
  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
      env: {
        jest: true,
      },
    },
  ],
};
