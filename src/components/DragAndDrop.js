// DragAndDrop.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';

const DragAndDrop = ({ items, correctAnswer, onCorrectAnswer, dropAreaWidth }) => {
  const [pan] = useState(new Animated.ValueXY());
  const [dropped, setDropped] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.moveX > dropAreaWidth) {
        // Item is dropped correctly within the specified drop area
        setDropped(true);
        onCorrectAnswer();
      } else {
        // Item is not dropped within the correct area, reset position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.draggableItem]}
      >
        <Text style={styles.itemText}>{items}</Text>
      </Animated.View>
      <View style={[styles.dropArea, { width: dropAreaWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  draggableItem: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
  dropArea: {
    height: 100,
    backgroundColor: 'lightgreen',
    marginTop: 20,
  },
});

export default DragAndDrop;
