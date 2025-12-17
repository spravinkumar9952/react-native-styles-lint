# Example Project for react-native-styles-lint

This is an example project to test the `react-native-styles-lint` ESLint plugin.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Make sure the parent package is built:
   ```bash
   cd ..
   npm run build
   cd example
   ```

## Testing the Linter

Run the linter to see the errors:

```bash
npm run lint
```

You should see errors for restricted style properties like:

- `fontWeight`
- `fontSize`
- `color`
- `backgroundColor`

## Auto-fix

Try auto-fixing the issues:

```bash
npm run lint:fix
```

This will automatically remove the restricted style properties from your code.

## Files

- `App.js` - Main app component with StyleSheet examples
- `App.test.js` - Test component with nested styles
- `.eslintrc.js` - ESLint configuration using the plugin
