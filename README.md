# react-native-styles-lint

An ESLint plugin for linting React Native styles.

## Installation

```bash
npm install --save-dev eslint-plugin-react-native-styles-lint
# or
yarn add -D eslint-plugin-react-native-styles-lint
```

## Usage

Add the plugin to your ESLint configuration file (`.eslintrc.js`, `.eslintrc.json`, or `eslint.config.js`):

### .eslintrc.js

```javascript
module.exports = {
  plugins: ['react-native-styles-lint'],
  rules: {
    'react-native-styles-lint/no-restricted-styles': [
      'error',
      {
        restrictedStyles: ['fontWeight', 'fontSize', 'color'],
      },
    ],
  },
};
```

### .eslintrc.json

```json
{
  "plugins": ["react-native-styles-lint"],
  "rules": {
    "react-native-styles-lint/no-restricted-styles": [
      "error",
      {
        "restrictedStyles": ["fontWeight", "fontSize", "color"]
      }
    ]
  }
}
```

### ESLint Flat Config (eslint.config.js)

```javascript
import reactNativeStylesLint from 'eslint-plugin-react-native-styles-lint';

export default [
  {
    plugins: {
      'react-native-styles-lint': reactNativeStylesLint,
    },
    rules: {
      'react-native-styles-lint/no-restricted-styles': [
        'error',
        {
          restrictedStyles: ['fontWeight', 'fontSize', 'color'],
        },
      ],
    },
  },
];
```

## Rules

### `no-restricted-styles`

Detects and removes restricted style properties in React Native `StyleSheet.create()`.

**Options:**

- `restrictedStyles` (array of strings): Array of style property names that should be restricted. Supports both camelCase and kebab-case (e.g., `fontWeight` or `font-weight`).

**Example:**

```javascript
// ❌ Error: Restricted style property "fontWeight" is not allowed.
const styles = StyleSheet.create({
  container: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// ✅ No errors
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
```

## Features

- ✅ Detect restricted style properties in `StyleSheet.create()`
- ✅ Auto-fix to remove restricted properties
- ✅ Support for nested style objects
- ✅ Case-insensitive matching
- ✅ Support for both camelCase and kebab-case property names

## Example Project

An example project is included in the `example/` directory to demonstrate how to use this plugin.

To test the plugin with the example:

```bash
# Build the package
npm run build

# Test the example project
npm run test:example

# Or manually:
cd example
npm install
npm run lint
```

The example includes sample React Native code with StyleSheet definitions that will trigger ESLint errors for restricted styles.

## License

MIT
