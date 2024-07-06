// components/AnswerBox.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnswerBox = ({ answer, isDropped, backgroundColor }) => {
  return (
    <View style={[styles.box, { backgroundColor }]}>
      <Text style={styles.text}>{isDropped ? answer : '?'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default AnswerBox;
