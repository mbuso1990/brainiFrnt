// src/screens/LearningScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LearningScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Learning Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default LearningScreen;