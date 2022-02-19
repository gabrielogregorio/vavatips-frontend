module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', '@typescript-eslint', 'cypress'],
  rules: {
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',
    'no-shadow': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }]
  },
  extends: ["next/core-web-vitals", "airbnb", "prettier", "plugin:cypress/recommended", "plugin:storybook/recommended"],
  overrides: [{
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
    env: {
      jest: true
    }
  }],
  globals: {
    cy: true
  }
};