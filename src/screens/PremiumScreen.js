import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const PremiumScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Subscription</Text>
      <Text style={styles.description}>
        Unlock all features and levels with our premium subscription.
      </Text>
      <TouchableOpacity style={styles.subscribeButton}>
        <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(5),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: responsiveFontSize(3.5),
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: responsiveHeight(2),
  },
  description: {
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    marginBottom: responsiveHeight(4),
    color: '#333',
  },
  subscribeButton: {
    backgroundColor: '#32CD32',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: 5,
  },
  subscribeButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PremiumScreen;
