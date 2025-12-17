# `no-export-stylesheet-function`

Prevent exporting functions or objects that create StyleSheet objects (to keep linting local).

## Rule Details

This rule prevents exporting functions or variables that contain `StyleSheet.create()` calls. This helps ensure that style definitions remain local to the file where they're used, making it easier to lint and maintain styles.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```javascript
// Exporting a function that creates StyleSheet
export function getStyles() {
  return StyleSheet.create({
    container: {
      padding: 10,
    },
  });
}

// Exporting an arrow function that creates StyleSheet
export const createStyles = () => {
  return StyleSheet.create({
    container: {
      margin: 5,
    },
  });
};

// Exporting a function expression that creates StyleSheet
export const styles = function () {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
  });
};

// Exporting StyleSheet.create directly
export const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

// Exporting a variable that contains StyleSheet.create
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export { styles }; // ❌ Error: Do not export "styles" because it contains StyleSheet.create
```

### ✅ Correct

```javascript
// Keep StyleSheet.create local to the file - don't export it
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

// Use styles locally in the same file
const MyComponent = () => {
  return <View style={styles.container}>...</View>;
};

// Export other things, but not StyleSheet objects or functions that create StyleSheet
export function getData() {
  return { some: 'data' };
}

export { MyComponent }; // ✅ OK - exporting component, not styles

// Local function (not exported) is fine
function createLocalStyles() {
  return StyleSheet.create({
    container: {
      padding: 10,
    },
  });
}
```

## Configuration

```javascript
module.exports = {
  plugins: ['react-native-styles-lint'],
  rules: {
    'react-native-styles-lint/no-export-stylesheet-function': 'error',
  },
};
```

## Features

- ✅ **Detects exported functions**: Catches both function declarations and arrow functions
- ✅ **Detects exported StyleSheet objects**: Catches direct exports of `StyleSheet.create()` results
- ✅ **Detects re-exported variables**: Catches `export { styles }` where styles contains StyleSheet.create
- ✅ **StyleSheet.create detection**: Identifies functions and variables containing `StyleSheet.create`
- ✅ **Multiple export patterns**: Works with `export function`, `export const`, `export { ... }`, and function expressions

## When to Use

Use this rule when you want to:

- Keep style definitions local to their usage files
- Ensure styles are linted in the context where they're used
- Prevent style functions from being imported across multiple files
- Maintain better code organization by keeping styles close to components
- Enforce a pattern where styles are defined in the same file as the component

## Why This Rule Exists

When style-creating functions are exported and used across multiple files, it becomes harder to:

- Lint styles in context
- Understand where styles are actually used
- Maintain consistent styling patterns
- Track style dependencies

By keeping `StyleSheet.create()` calls local to the file, you ensure that:

- Styles are always defined near their usage
- Linting can be more effective
- Code is easier to understand and maintain

## Related Rules

- [`no-restricted-styles`](./no-restricted-styles.md) - Restrict specific style properties
- Consider using this rule alongside style organization best practices
