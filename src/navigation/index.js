import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { GameContextProvider } from '../context/GameContext';
import { StyleSheet } from 'react-native';

import LoadingScreen from '../screens/LoadingScreen';
import IntroductionScreen from '../screens/IntroductionScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import AIScreen from '../screens/Aiscreen.js';
import PaymentScreen from '../screens/PaymentScreen';
import PackageScreen from '../screens/PackageScreen'; // Import the new screen
import QuizScreen from '../screens/QuizScreen';
import ScoreScreen from '../screens/ScoreScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PremiumScreen from '../screens/PremiumScreen';
import VideoPlayer from '../screens/VideoPlayer';
import ScoreGraph from '../screens/ScoreGraph';
import FreeScreen from '../screens/FreeScreen';
import TestAsyncStorage from '../screens/TestAsyncStorage';
import HiScreen from '../screens/HiScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        height: 70,
        backgroundColor: '#0056b3',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'visible',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
      },
      tabBarIconStyle: {
        marginBottom: -5,
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Search') {
          iconName = 'search-outline';
        } else if (route.name === 'Quiz') {
          iconName = focused ? 'bulb' : 'bulb-outline';
        } else if (route.name === 'Bookmarks') {
          iconName = 'bookmark-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        }
        return <Icon name={iconName} color={color} size={size} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={QuizScreen} />
    <Tab.Screen name="Bookmarks" component={ScoreGraph} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const RootNavigation = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <GameContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Introduction" component={IntroductionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TestAsyncStorage" component={TestAsyncStorage} />
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Score" component={ScoreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Premium" component={PremiumScreen} options={({ navigation }) => ({
            headerShown: true,
            headerTitle: '',
            headerBackTitleVisible: false,
            headerTintColor: '#0056b3',
            headerLeft: () => (
              <Icon
                name="arrow-back"
                size={25}
                color="#0056b3"
                style={{ marginLeft: 1, marginTop: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />
          <Stack.Screen name="ScoreGraph" component={ScoreGraph} options={{ headerShown: false }} />
          <Stack.Screen name="Free" component={FreeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name="PaymentWebView" component={PaymentWebView} options={{ headerShown: false }} /> */}
          <Stack.Screen name="HiScreen" component={HiScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AIScreen" component={AIScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Package" component={PackageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameContextProvider>
  );
};

const styles = StyleSheet.create({
  lightbulbContainer: {
    width: 96,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#0056b3',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -30 }],
  },
});

export default RootNavigation;
