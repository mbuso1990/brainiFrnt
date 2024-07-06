import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestAsyncStorage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          console.log('User found in AsyncStorage:', JSON.parse(storedUser));
          setUser(JSON.parse(storedUser));
        } else {
          console.log('No user found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to load user', error);
      }
    };
    loadUser();
  }, []);

  return (
    <View>
      {user ? (
        <Text>User: {JSON.stringify(user)}</Text>
      ) : (
        <Text>No user found</Text>
      )}
    </View>
  );
};

export default TestAsyncStorage;
