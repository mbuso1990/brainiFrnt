import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ProgressBar from '../components/ProgressBar';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Name');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ProgressBar progress={10} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Hey there! I’m Brainni</Text>
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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
});

export default WelcomeScreen;