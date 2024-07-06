import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const danceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startDanceAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(danceAnimation, {
            toValue: -10,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(danceAnimation, {
            toValue: 10,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(danceAnimation, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    const timer = setTimeout(() => {
      danceAnimation.stopAnimation(); // Stop animation after 5 seconds
    }, 5000);

    startDanceAnimation();

    return () => {
      clearTimeout(timer); // Clear the timer when unmounting
      danceAnimation.stopAnimation(); // Stop animation when component unmounts
    };
  }, [danceAnimation]);

  const handleLogin = async () => {
    setLoading(true); // Show loading indicator
    setErrorMessage(''); // Clear previous errors

    try {
      console.log(`Attempting to log in with username: ${username}`);
      const userData = await login(username, password); // Call context login
      if (userData) {
        console.log('User data after login:', userData); // Log user data for debugging
        navigation.navigate('Main'); // Navigate to the Main screen (homepage)
      } else {
        setErrorMessage('Login successful but user data is incomplete.');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image source={require('../assets/logo.png')} style={[styles.logo, { transform: [{ translateY: danceAnimation }] }]} />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.freeAccessButton} onPress={() => navigation.navigate('Onboarding')}>
            <Text style={[styles.buttonText, styles.free]}>Free Access</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Don't have an account? Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
       
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0056b3',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    color: '#fff',
    fontWeight: "200", // Sets the font weight to a value that is slightly lighter than normal 'bold'

  

  },
  button: {
    backgroundColor: '#007bff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  freeAccessButton: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    color:"#0056b3"
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'  // Sets the font weight to bold
  },
  linkText: {
    color: '#fff',
    marginTop: 20,
   
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  free: {
    color:"#0056b3",
    fontWeight: 'bold'  // Sets the font weight to bold
  }
});

export default LoginScreen;
