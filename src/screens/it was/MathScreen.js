import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProgressBar from '../../components/ProgressBar';
import { UserContext } from '../../context/UserContext';

const MathScreen = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserContext);
  const [coolThingInMath, setCoolThingInMath] = useState('');

  const handleNext = () => {
    setUserData({ ...userData, coolThingInMath });
    navigation.navigate('Discovery');
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={60} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}> Hey {userData.name}, what’s the coolest thing in math for you?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={coolThingInMath}
          style={styles.picker}
          onValueChange={(itemValue) => setCoolThingInMath(itemValue)}
          dropdownIconColor="#fff" // Change arrow color
          itemStyle={{ color: 'white' }} // Change items color
        >
          <Picker.Item label="Algebra" value="Algebra" color="#fff" />
          <Picker.Item label="Geometry" value="Geometry" />
          <Picker.Item label="Calculus" value="Calculus" />
          <Picker.Item label="Statistics" value="Statistics" />
        </Picker>
      </View>
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
    color: 'white',
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    color: 'white',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white', // Change picker text color
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    width: '90%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MathScreen;
