import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { TouchableWithoutFeedback } from 'react-native';
const OnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const translateX = new Animated.Value(0);
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    source: '',
    parentPhone: '',
  });

  const steps = [
    { question: "Hey there! I’m Brainni, what’s your name?", placeholder: "Enter your name", type: "text", key: 'name' },
    { question: "How’d you find out about me?", type: "picker", options: ["From a friend", "From a teacher", "Online", "Other"], key: 'source' },
    { question: "Almost there! Let’s ask a parent to help with this part?", placeholder: "Enter parent's phone number", type: "text", key: 'parentPhone' },
    { question: "Awesome! We’re all set. Let's start learning!", type: "final" },
  ];

  const images = [
    require('../assets/Name.png'),
    require('../assets/Where you heard.png'),
    require('../assets/Parent email and phone.png'),
    require('../assets/All done.png'),
  ];

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease)
    }).start();
  }, [step]);

  useEffect(() => {
    if (steps[step].key === 'source') {
      setInput('From a friend');
    }
  }, [step]);

  const handleNext = async () => {
    if (step < steps.length - 1) {
      if (steps[step].key) {
        setFormData({
          ...formData,
          [steps[step].key]: input,
        });
      }
      setInput('');
      Animated.timing(translateX, {
        toValue: -500,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease)
      }).start(() => {
        setStep(step + 1);
        translateX.setValue(500);
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease)
        }).start();
      });
    } else {
      try {
        const userId = user ? user._id : null;
        const dataToSend = { ...formData, userId };
        
        console.log('Sending data to server:', dataToSend); // Log the data being sent
        const response = await axios.post('https://brainni.onrender.com/api/onboarding/create', dataToSend);
        console.log('Onboarding response:', response.data); // Log the response data
        await AsyncStorage.setItem('firstLaunch', 'false');
        navigation.navigate('Main');
      } catch (error) {
        console.error('Error submitting onboarding data:', error.message);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        }
      }
    }
  };
  

  const progress = (step / (steps.length - 1)) * 100;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ProgressBar progress={progress} />
      <TouchableWithoutFeedback disabled={isFocused}>
        <Animated.View style={[styles.contentContainer, { transform: [{ translateX }] }]}>
          <Image source={images[step]} style={styles.image} />
          <Text style={styles.question}>{steps[step].question}</Text>
          {steps[step].type === "text" && (
            <TextInput
              style={[
                styles.input,
                isFocused && styles.inputFocused
              ]}
              placeholder={steps[step].placeholder}
              value={input}
              onChangeText={setInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
          {steps[step].type === "picker" && (
            <Picker
              selectedValue={input}
              onValueChange={(itemValue) => setInput(itemValue)}
              style={styles.picker}
            >
              {steps[step].options.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </ScrollView>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100, // Add some padding at the bottom to accommodate the keyboard
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 310,
    height: 310,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#1F4ACB',
    backgroundColor: '#fff',
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#1F4ACB',
    paddingVertical: 10,
    paddingHorizontal: 140,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
