module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['__mocks__', '.eslintrc.js', 'babel.config.js', 'jest.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-named-as-default': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      },
    ],
    'testing-library/consistent-data-testid': [2, { testIdPattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' }],
  },
  overrides: [
    {
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      rules: {
        'testing-library/prefer-query-matchers': [
          2,
          {
            validEntries: [
              { matcher: 'toBeVisible', query: 'get' },
              { matcher: 'toBeEnabled', query: 'get' },
              { matcher: 'toBeChecked', query: 'get' },
              { matcher: 'toHaveStyle', query: 'get' },
              { matcher: 'toHaveClass', query: 'get' },
              { matcher: 'toHaveAttribute', query: 'get' },
              { matcher: 'toHaveTextContent', query: 'get' },
              { matcher: 'toHaveFocus', query: 'get' },
              { matcher: 'toHaveValue', query: 'get' },
            ],
          },
        ],
      },
    },
  ],
};
