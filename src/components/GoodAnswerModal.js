
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const GoodAnswerModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Good Answer!</Text>
          <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GoodAnswerModal;
