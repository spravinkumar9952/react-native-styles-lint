import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export const ExampleComponent = () => {
  return (
    <View>
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
});
export default ExampleComponent;
