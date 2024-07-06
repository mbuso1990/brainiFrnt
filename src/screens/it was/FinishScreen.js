import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { UserContext } from '../../context/UserContext';

const FinishScreen = ({ navigation }) => {
  const { userData } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <ProgressBar progress={100} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Awesome! We’re all set {userData.name}. Let's start learning</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Subscription')}>
        <Text style={styles.buttonText}>Start Learning</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0056b3',
    paddingTop: 60,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color:'#fff'
  },
  button: {
    backgroundColor: '#007bff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default FinishScreen;
