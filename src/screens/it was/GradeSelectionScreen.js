import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GradeSelectionScreen = ({ navigation }) => {
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Grade</Text>
      <View style={styles.grid}>
        {grades.map((grade, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Quiz', { grade })}
          >
            <Text style={styles.cardText}>{grade}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '30%',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GradeSelectionScreen;
