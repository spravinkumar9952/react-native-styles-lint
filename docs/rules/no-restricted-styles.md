# `no-restricted-styles`

Detects and removes restricted style properties in React Native `StyleSheet.create()`.

## Rule Details

This rule helps enforce style guidelines by preventing the use of specific style properties in React Native StyleSheet definitions.

## Options

- `restrictedStyles` (array of strings): Array of style property names that should be restricted. Supports both camelCase and kebab-case (e.g., `fontWeight` or `font-weight`).

## Examples

### ❌ Incorrect

```javascript
const styles = StyleSheet.create({
  container: {
    fontWeight: 'bold', // ❌ Error: Restricted style property "fontWeight" is not allowed.
    fontSize: 16, // ❌ Error: Restricted style property "fontSize" is not allowed.
    color: '#000000', // ❌ Error: Restricted style property "color" is not allowed.
    padding: 10,
  },
  title: {
    backgroundColor: '#fff', // ❌ Error: Restricted style property "backgroundColor" is not allowed.
  },
});
```

### ✅ Correct

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  title: {
    marginBottom: 10,
  },
});
```

## Configuration

```javascript
module.exports = {
  plugins: ['react-native-styles-lint'],
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
  },
};
```

## Features

- ✅ **Auto-fixable**: Automatically removes restricted properties when using `eslint --fix`
- ✅ **Nested Support**: Works with nested style objects
- ✅ **Case-insensitive**: Matches properties regardless of case
- ✅ **Flexible Naming**: Supports both camelCase (`fontWeight`) and kebab-case (`font-weight`)

## When to Use

Use this rule when you want to:

- Enforce a design system that restricts certain style properties
- Prevent direct style values in favor of theme-based styling
- Ensure consistent styling across your React Native application
- Migrate from inline styles to a centralized style system

## Auto-fix Behavior

When auto-fix is enabled, the rule will automatically remove restricted properties from your StyleSheet definitions:

**Before:**

```javascript
const styles = StyleSheet.create({
  container: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
});
```

**After (with auto-fix):**

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
```

## Related Rules

- Consider using this rule alongside theme-based styling solutions
- Can be combined with other style linting rules for comprehensive style enforcement
