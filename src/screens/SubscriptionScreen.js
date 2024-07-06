// frontend/src/screens/SubscriptionScreen.js
import React, { useState, useContext } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const SubscriptionScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState('monthly');

  // Define prices for the plans
  const plans = {
    monthly: { price: 'R100', description: 'R100 per month' },
    yearly: { price: 'R300', description: 'R300 per year (cancel anytime)' },
    lifetime: { price: 'R3000', description: 'R3000 for a lifetime subscription' }
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post('http://192.168.43.59:5000/api/subscriptions/subscribe', {
        userId: user._id,
        plan
      });

      if (response.data && response.data.url) {
        // Navigate to the PayFast payment page using WebView
        navigation.navigate('PaymentWebView', { url: response.data.url });
      } else {
        Alert.alert('Error', 'Unable to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      Alert.alert('Error', 'Unable to initiate payment');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Subscription Plan</Text>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Monthly Plan - {plans.monthly.price}</Text>
        <Text style={styles.planDescription}>{plans.monthly.description}</Text>
        <Button title="Select Monthly" onPress={() => setPlan('monthly')} />
      </View>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Yearly Plan - {plans.yearly.price}</Text>
        <Text style={styles.planDescription}>{plans.yearly.description}</Text>
        <Button title="Select Yearly" onPress={() => setPlan('yearly')} />
      </View>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Lifetime Plan - {plans.lifetime.price}</Text>
        <Text style={styles.planDescription}>{plans.lifetime.description}</Text>
        <Button title="Select Lifetime" onPress={() => setPlan('lifetime')} />
      </View>
      <Button title="Proceed to Payment" onPress={initiatePayment} style={styles.proceedButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  planContainer: {
    marginBottom: 20,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  proceedButton: {
    marginTop: 30,
  },
});

export default SubscriptionScreen;
