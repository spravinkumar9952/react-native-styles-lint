# Rules Documentation

This directory contains detailed documentation for each ESLint rule provided by `@spravinkumar9952/react-native-styles-lint`.

## Available Rules

- [`no-restricted-styles`](./rules/no-restricted-styles.md) - Detect and remove restricted style properties in React Native `StyleSheet.create()`
- [`no-export-stylesheet-function`](./rules/no-export-stylesheet-function.md) - Prevent exporting functions or objects that create StyleSheet objects (to keep linting local)
- [`no-unused-styles`](./rules/no-unused-styles.md) - Detect unused styles in React Native `StyleSheet.create()`

## Contributing

When adding new rules, please:

1. Create a new markdown file in the `rules/` directory
2. Follow the same format as existing rule documentation
3. Update the main README.md with the new rule in the rules table
4. Include examples, configuration options, and auto-fix behavior
