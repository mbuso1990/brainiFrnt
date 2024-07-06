import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const slides = [
  { text: 'Welcome to our platform! We use AI to help your child learn in a fun, engaging way', image: require('../assets/welcome.png') },
  { text: 'Simply drag and drop to explore interactive learning activities.', image: require('../assets/online.png') },
  { text: 'Upgrade to our paid version to unlock all features and content. try our new!', image: require('../assets/subscription.png') },
];

const IntroductionScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const translateX = useSharedValue(0);

  const handleNext = () => {
    navigation.navigate('Onboarding');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleGesture = (event) => {
    if (event.nativeEvent.translationX < -50 && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      translateX.value = withSpring(-width * (currentSlide + 1));
    } else if (event.nativeEvent.translationX > 50 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      translateX.value = withSpring(-width * (currentSlide - 1));
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Brainni</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.headerLink}>Skip</Text>
        </TouchableOpacity>
      </View>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={[styles.content, animatedStyle]}>
          {slides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <Image source={slide.image} style={styles.image} />
              <Text style={styles.text}>{slide.text}</Text>
            </View>
          ))}
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.circles}>
        {slides.map((slide, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.circle,
              currentSlide === index && styles.activeCircle,
            ]}
            onPress={() => {
              setCurrentSlide(index);
              translateX.value = withSpring(-width * index);
            }}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#1F4ACB',
    position: 'relative',
    top: 100,
    left: 75,
  },
  headerLink: {
    fontSize: 14,
    color: '#1F4ACB',
    fontWeight: 'bold',
    position: 'relative',
    top: 20,
    right: 20,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    width: width * slides.length,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    position: 'relative',
    top: 60,
    right: 38,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 40,
    position: 'relative',
    top: 70,
    right: 20,
  },
  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
  },
  activeCircle: {
    backgroundColor: '#1F4ACB',
  },
  button: {
    backgroundColor: '#1F4ACB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IntroductionScreen;
