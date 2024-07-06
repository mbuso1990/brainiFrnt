import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const ProgressModal = ({ modalVisible, handleCloseModal, handleGestureEvent, handleGestureStateChange, translateY, levels, currentLevelIndex }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      transparent={true}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalBackdrop}>
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleGestureStateChange}
        >
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Progress</Text>
            <FlatList
              data={levels}
              keyExtractor={(item) => item.level.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.levelProgress}>
                  <Text style={styles.levelProgressText}>Level {item.level}</Text>
                  <FontAwesome
                    name={index <= currentLevelIndex ? "check-circle" : "circle-o"}
                    size={24}
                    color={index <= currentLevelIndex ? "#4caf50" : "#ccc"}
                  />
                </View>
              )}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  levelProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  levelProgressText: {
    fontSize: 18,
  },
});

export default ProgressModal;
