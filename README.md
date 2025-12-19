# @spravinkumar9952/react-native-styles-lint

An ESLint plugin for linting React Native styles.

## Installation

```bash
npm install --save-dev @spravinkumar9952/react-native-styles-lint
# or
yarn add -D @spravinkumar9952/react-native-styles-lint
```

## Usage

Add the plugin to your ESLint configuration file (`.eslintrc.js`, `.eslintrc.json`, or `eslint.config.js`):

### .eslintrc.js (ESLint 8.x)

Since the package doesn't follow the `eslint-plugin-*` naming convention, you have two options:

**Option 1: Create a local plugin file (Recommended)**

Create a file `eslint-plugin-react-native-styles-lint.js` in your project root:

```javascript
// eslint-plugin-react-native-styles-lint.js
module.exports = require('@spravinkumar9952/react-native-styles-lint');
```

Then in your `.eslintrc.js`:

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

**Option 2: Use require() with plugins array (Alternative)**

```javascript
const reactNativeStylesLint = require('@spravinkumar9952/react-native-styles-lint');

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
  // Note: You'll need to manually register the plugin
  // This approach may require additional configuration
};
```

### .eslintrc.json

For JSON config files, create the local plugin file as shown in Option 1 above, then use:

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
import reactNativeStylesLint from '@spravinkumar9952/react-native-styles-lint';

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

| Rule                                                                             | Description                                                                                   | Auto-fixable |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------ |
| [`no-restricted-styles`](./docs/rules/no-restricted-styles.md)                   | Detect and remove restricted style properties in React Native `StyleSheet.create()`           | ✅ Yes       |
| [`no-export-stylesheet-function`](./docs/rules/no-export-stylesheet-function.md) | Prevent exporting functions or objects that create StyleSheet objects (to keep linting local) | ❌ No        |
| [`no-unused-styles`](./docs/rules/no-unused-styles.md)                           | Detect unused styles in React Native `StyleSheet.create()`                                    | ✅ Yes       |

Click on a rule name to view its detailed documentation.

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
