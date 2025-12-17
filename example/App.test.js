import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Test file with nested styles
const TestComponent = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff', // ❌ Restricted: backgroundColor
  },
  text: {
    fontSize: 18, // ❌ Restricted: fontSize
    fontWeight: 'normal', // ❌ Restricted: fontWeight
    color: '#333', // ❌ Restricted: color
    padding: 10, // ✅ Allowed
    margin: 5, // ✅ Allowed
  },
});

export default TestComponent;
