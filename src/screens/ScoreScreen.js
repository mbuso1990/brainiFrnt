import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ScoreScreen = ({ route, navigation }) => {
  const { score, wrongAnswers, tries, skips } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>Correct Answers: {score}</Text>
      <Text style={styles.score}>Wrong Answers: {wrongAnswers}</Text>
      <Text style={styles.score}>Tries: {tries}</Text>
      <Text style={styles.score}>Skips: {skips}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.buttonText}>Retry Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  score: {
    fontSize: 24,
    marginBottom: 10,
    color: '#555',
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScoreScreen;