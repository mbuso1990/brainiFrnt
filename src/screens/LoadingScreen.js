import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
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
      }).start(() => {
        navigation.replace('Login'); // Navigate to Login screen after fade-out
      });
    }, 12000); // Start fade-out after 12 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F4ACB',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});

export default LoadingScreen;
