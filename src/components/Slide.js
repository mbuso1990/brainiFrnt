import React from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const Slide = ({ currentSlide, slideOpacity, slideTranslateX, pan, dragging, draggedItem, dropZoneValues, setDragging, handleRelease }) => {
  const dragItems = currentSlide.dragItems ? currentSlide.dragItems.map((item, index) => (
    <PanGestureHandler
      key={index}
      onGestureEvent={Animated.event([{ nativeEvent: { translationX: pan.x, translationY: pan.y } }], { useNativeDriver: false })}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          handleRelease(event);
        }
        if (event.nativeEvent.state === State.ACTIVE && !dragging) {
          setDragging(true);
          draggedItem.current = item;
        }
      }}
      enabled={!dragging || draggedItem.current === item}
    >
      <Animated.View style={[styles.draggable, { transform: [{ translateX: dragging && draggedItem.current === item ? pan.x : 0 }, { translateY: dragging && draggedItem.current === item ? pan.y : 0 }] }]}>
        <Text style={styles.dragItemText}>{item}</Text>
      </Animated.View>
    </PanGestureHandler>
  )) : null;

  return (
    <Animated.View
      style={[
        styles.slideContainer,
        {
          opacity: slideOpacity,
          transform: [{ translateX: slideTranslateX }],
        },
      ]}
    >
      <Text style={styles.questionText}>{currentSlide.text}</Text>
      {currentSlide.image && (
        <Image
          source={{ uri: currentSlide.image }}
          style={styles.slideImage}
        />
      )}
      {currentSlide.slideNo === 3 && (
        <View style={styles.dropZone} onLayout={(event) => dropZoneValues.current = event.nativeEvent.layout}>
          <Text style={styles.dropZoneText}>Drop Here</Text>
        </View>
      )}
      <View style={styles.dragItemsContainer}>
        {dragItems}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 20,
  },
  slideImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  dropZone: {
    height: 100,
    width: 200,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropZoneText: {
    color: '#fff',
    fontSize: 18,
  },
  dragItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Adjusted to space between
    paddingHorizontal: 20, // Added for padding
  },
  draggable: {
    backgroundColor: '#e74c3c',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: (Dimensions.get('window').width - 60) / 2, // Adjusted width to fit two items per row
    alignItems: 'center', // Center the text
  },
  dragItemText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Slide;
