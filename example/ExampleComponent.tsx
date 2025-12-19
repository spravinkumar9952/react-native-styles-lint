import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export const ExampleComponent = () => {
  const name = 'hello';
  const styles = useMemo(() => styles2(name), [name]);

  return (
    <View style={styles.container}>
      <Text>Example Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
  },
  unusedStyle: {
    margin: 10,
  },
});

function styles2(name: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      padding: 10,
    },
  });
}

export default ExampleComponent;
