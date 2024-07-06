import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height } = Dimensions.get('window');
const offset = height * 0.07;

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    navigation.replace('Subscription');
  };

  const handleGoogleSignup = () => {
    navigation.replace('Subscription');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let's create an account to help you track your progress</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          textAlign="center"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textAlign="center"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.createAccountButton]} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleSignup}>
          <Icon name="google" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}> Create an Account with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.accountButton]} onPress={() => navigation.replace('Login')}>
          <Text style={styles.buttonText}>Already have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.visitorButton]} onPress={() => navigation.replace('Subscription')}>
          <Text style={styles.buttonText}>Just check...</Text>
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
    padding: 16,
    backgroundColor: '#fff', // Background color white
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#333', // Dark text color
    marginTop: -offset, // Move heading up
  },
  inputContainer: {
    width: '100%',
    marginBottom: offset, // Move inputs and buttons down
    alignItems: 'center',
  },
  input: {
    width: '90%', // Reduce width to 90% of the container
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%', // Reduce width to 90% of the container
    height: 50, // Set height to ensure all buttons are the same
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
  createAccountButton: {
    backgroundColor: '#f5f378', // Create Account button background color
  },
  googleButton: {
    backgroundColor: '#14ae5c', // Google button background color
  },
  accountButton: {
    backgroundColor: '#dcc1ff', // Already have an account button background color
  },
  visitorButton: {
    backgroundColor: '#7b68ee', // Visitor button background color
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10, // Add some margin to the right of the icon
  },
});

export default CreateAccountScreen;