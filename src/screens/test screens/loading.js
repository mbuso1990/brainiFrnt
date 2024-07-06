import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Animated } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LoadingScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const fadeAnim = new Animated.Value(1); // Initial opacity for the fade animation

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // 1 second fade-out
        useNativeDriver: true,
      }).start();
    }, 11000); // Start fade-out after 11 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigation.navigate('Onboarding');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Brainni</Text>
      <Text style={styles.subtitle}>Welcome!</Text>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start easy</Text>
      </TouchableOpacity>
      <Text style={styles.linkText} onPress={handleLogin}>
        Have an account? <Text style={styles.link}>Log In</Text>
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0056b3',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '425',
    color: '#00d0c0',
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff95e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LoadingScreen;
