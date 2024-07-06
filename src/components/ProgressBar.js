import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ progress }) => {
  const progressColor = '#14ae5c';
  const progressWidth = new Animated.Value(progress);

  Animated.timing(progressWidth, {
    toValue: progress,
    duration: 500,
    useNativeDriver: false,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: progressWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }), backgroundColor: progressColor }]} />
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
    top: 70,
  },
  progressBar: {
    height: '100%',
    borderRadius: 20,
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProgressBar;
