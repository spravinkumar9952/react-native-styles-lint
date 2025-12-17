/**
 * React Native Styles Lint
 * ESLint plugin for React Native styles
 */

// Import ESLint rules
// @ts-ignore - ESLint rules are in JS format
// eslint-disable-next-line @typescript-eslint/no-require-imports
const noRestrictedStyles = require('./linters/no-restricted-styles');

/**
 * ESLint plugin configuration
 */
const plugin = {
  rules: {
    'no-restricted-styles': noRestrictedStyles,
  },
};

// Export as CommonJS for ESLint compatibility
// @ts-ignore - CommonJS export for ESLint compatibility
module.exports = plugin;

