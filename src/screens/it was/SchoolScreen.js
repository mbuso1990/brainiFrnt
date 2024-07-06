import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { UserContext } from '../../context/UserContext';

const SchoolScreen = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserContext);
  const [school, setSchool] = useState('');

  const handleNext = () => {
    setUserData({ ...userData, school });
    navigation.navigate('Math');
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={50} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Sweet! Which school do you go to?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your school name"
        value={school}
        onChangeText={setSchool}
        placeholderTextColor="#fff"  
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    color:'white'
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
    color:'white'
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
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

export default SchoolScreen;