// frontend/src/App.js
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import RootNavigation from './navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <UserProvider>
          <SubscriptionProvider>
            <RootNavigation />
          </SubscriptionProvider>
        </UserProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
