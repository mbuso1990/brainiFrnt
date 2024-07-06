// screens/PackageScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import logo from '../assets/logo.png';

const PackageScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.bubbleContainer}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>Interactive</Text>
        </View>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>Educational</Text>
        </View>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>Fun</Text>
        </View>
      </View>
      <Text style={styles.title}>Interactive Quizzes for Kids</Text>
      <Text style={styles.description}>
        Engage your child with fun and educational quizzes designed to enhance their learning experience. Suitable for ages 4-7.
      </Text>
      <Text style={styles.benefit}>
        We gather data to personalize and improve your child's learning experience with AI.
      </Text>
      <Text style={styles.benefit}>
        Enjoy 24/7 access to our quizzes, with real tutors available to help if your child gets stuck.
      </Text>
      <Text style={styles.benefit}>
        Our quizzes are designed to develop critical thinking and problem-solving skills.
      </Text>
      <Text style={styles.benefit}>
        Track your child's progress and celebrate their achievements.
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>Price: R250</Text>
        <TouchableOpacity style={styles.subscribeButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0056b3',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bubble: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 10,
    margin: 5,
  },
  bubbleText: {
    color: '#0056b3',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  benefit: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056b3',
    marginRight: 10,
  },
  subscribeButton: {
    backgroundColor: '#0056b3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PackageScreen;
