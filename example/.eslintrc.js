module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-native-styles-lint', '@typescript-eslint'],
  rules: {
    'react-native-styles-lint/no-restricted-styles': [
      'error',
      {
        restrictedStyles: [
          'fontWeight',
          'fontSize',
          'color',
          'backgroundColor',
        ],
      },
    ],
    'react-native-styles-lint/no-export-stylesheet-function': 'error',
    // Disable some rules that aren't relevant for this example
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
};
