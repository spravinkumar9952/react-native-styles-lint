import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExampleComponent from './ExampleComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Styles Lint Example</Text>
      <Text style={styles.subtitle}>
        This example demonstrates the ESLint plugin
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Card Content</Text>
      </View>
      <ExampleComponent />
    </View>
  );
};

// This will trigger ESLint errors for restricted styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // ❌ Restricted: backgroundColor
  },
  title: {
    fontSize: 24, // ❌ Restricted: fontSize
    fontWeight: 'bold', // ❌ Restricted: fontWeight
    color: '#000000', // ❌ Restricted: color
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    padding: 10, // ✅ Allowed
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
    backgroundColor: '#f0f0f0', // ❌ Restricted: backgroundColor
  },
  cardText: {
    fontSize: 16, // ❌ Restricted: fontSize
    fontWeight: '600', // ❌ Restricted: fontWeight
  },
});

export default App;
