# `no-unused-styles`

Detect unused styles in React Native `StyleSheet.create()`.

## Rule Details

This rule identifies style properties defined in `StyleSheet.create()` that are never used in the file. The rule scans all `StyleSheet.create()` calls in the file and checks if any object name containing "style" (case-insensitive) as a substring accesses those properties. Unused styles can clutter your codebase and make it harder to maintain.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  unusedStyle: {
    // ❌ Error: Unused style detected: "unusedStyle"
    margin: 5,
  },
  anotherUnused: {
    // ❌ Error: Unused style detected: "anotherUnused"
    flex: 1,
  },
  usedStyle: {
    borderRadius: 8,
  },
});

// Only 'container' and 'usedStyle' are used
const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.usedStyle}>Hello</Text>
    </View>
  );
};
```

### ✅ Correct

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textStyle: {
    borderRadius: 8,
  },
});

// All styles are used
const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello</Text>
    </View>
  );
};
```

## Configuration

```javascript
module.exports = {
  plugins: ['react-native-styles-lint'],
  rules: {
    'react-native-styles-lint/no-unused-styles': 'error',
  },
};
```

## Features

- ✅ **Auto-fixable**: Automatically removes unused style properties when using `eslint --fix`
- ✅ **Pattern matching**: Detects usage via any object name containing "style" as a substring
- ✅ **Clean removal**: Removes unused properties and handles trailing commas correctly
- ✅ **Bracket notation support**: Handles both dot notation and bracket notation

## When to Use

Use this rule when you want to:

- Keep your codebase clean by removing dead code
- Identify styles that are no longer needed
- Maintain a lean style definition
- Prevent accumulation of unused styles over time
- Improve code maintainability

## Auto-fix Behavior

When auto-fix is enabled, the rule will automatically remove unused style properties:

**Before:**

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  unusedStyle: {
    margin: 5,
  },
  usedStyle: {
    borderRadius: 8,
  },
});
```

**After (with auto-fix):**

```javascript
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  usedStyle: {
    borderRadius: 8,
  },
});
```

## Detection Method

The rule uses a simple and effective approach:

1. **Scans all StyleSheet.create() calls**: Identifies all `StyleSheet.create()` calls in the file and extracts their property names
2. **Tracks property access**: Checks if any object name containing "style" (case-insensitive) as a substring accesses those properties
3. **Reports unused properties**: Flags any properties that are never accessed

**Supported patterns:**

- `styles.container` ✅
- `screenStyleObj.container` ✅ (object name contains "style")
- `myStyles['container']` ✅ (bracket notation)
- `componentStyles.container` ✅ (object name contains "style")
- `<View style={styles.container} />` ✅ (JSX attributes)

**How it works:**

- Reads all `StyleSheet.create()` properties in the file
- Checks if any object name containing "style" as a substring accesses those properties
- Only checks within the same file
- Handles both dot notation (`obj.property`) and bracket notation (`obj["property"]`)

## Limitations

- Only detects usage within the same file where styles are defined
- Styles used in other files (if exported) will be flagged as unused
- Dynamic property access with variables (e.g., `styles[dynamicVar]`) is not detected
- Only checks object names that contain "style" as a substring (case-insensitive)

## Related Rules

- [`no-restricted-styles`](./no-restricted-styles.md) - Restrict specific style properties
- [`no-export-stylesheet-function`](./no-export-stylesheet-function.md) - Prevent exporting StyleSheet objects
