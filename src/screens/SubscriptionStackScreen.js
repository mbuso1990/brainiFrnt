// SubscriptionStackScreen.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SubscriptionScreen from '../screens/SubscriptionScreen';

const SubscriptionStack = createStackNavigator();

const SubscriptionStackScreen = () => {
  return (
    <SubscriptionStack.Navigator>
      <SubscriptionStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{ headerShown: false }}
      />
    </SubscriptionStack.Navigator>
  );
};

export default SubscriptionStackScreen;
