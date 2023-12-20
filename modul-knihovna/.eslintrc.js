module.exports = {
    root: true,
  
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
    },
  
    env: {
      es2021: true,
      node: true,
    },
  
    extends: [
      'plugin:@typescript-eslint/recommended',
    ],
  
    plugins: [
      '@typescript-eslint',
    ],
  
    rules: {
      camelcase: 'off',
      'prefer-promise-reject-errors': 'off',
      quotes: ['warn', 'single', { avoidEscape: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-unused-vars': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      camelcase: 'off',
      'default-case-last': 'warn',
      'array-callback-return': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-types': 'warn',
      '@typescript-eslint/no-extra-semi': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'comma-dangle': ['error', 'only-multiline'],
      semi: [2, 'always'],
    },
  };