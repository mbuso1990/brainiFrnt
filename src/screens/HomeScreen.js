import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import GestureRecognizer from 'react-native-swipe-gestures';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Card = ({ title, text, image, cardStyle, textStyle, imageStyle, isPremium, onPress, onClose, onSwipeLeft }) => {
  return (
    <GestureRecognizer onSwipeLeft={onSwipeLeft}>
      <TouchableOpacity onPress={onPress} style={[styles.card, cardStyle]}>
        {isPremium && (
          <View style={styles.premiumHeader}>
            <Image source={require('../assets/crown.png')} style={styles.crownImage} />
            <Text style={styles.premiumText}>PREMIUM</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={responsiveFontSize(3.5)} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {title && <Text style={styles.cardTitle}>{title}</Text>}
        {text && text.map((line, index) => <Text key={index} style={[styles.cardText, textStyle]}>{line}</Text>)}
        {image && <Image source={image} style={[styles.cardImage, imageStyle]} />}
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const HomeScreen = () => {
  const [showPremiumCard, setShowPremiumCard] = useState(true);
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  // Animation setup
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ['#1e90ff', '#01F8D4', '#01F8D4', '#01F8D4'],
  });

  const navigateToFreeScreens = () => {
    navigation.navigate('Free');
    setTimeout(() => {
      navigation.navigate('Free');
    }, 500); // Delay to ensure sequential navigation
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/brain_profile.png')} style={styles.logo} />
        <Text style={styles.welcomeText}>
          Welcome, {user && user.username ? user.username : 'Guest'}
        </Text>
        {/* <Image source={require('../assets/coin.png')} style={styles.coinIcon} /> */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardList}>
          {showPremiumCard && (
            <Card
              isPremium
              text={['Unlock all features and levels for free', 'Grade 7 premium (excell)']}
              cardStyle={styles.premiumCard}
              onPress={() => navigation.navigate('Premium')}
              onClose={() => setShowPremiumCard(false)}
              onSwipeLeft={() => setShowPremiumCard(false)}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.bigButton} onPress={navigateToFreeScreens}>
            <Text style={styles.buttonText}>TRY FREE</Text>
          </TouchableOpacity>
          <Animated.View style={[styles.bigButton, { backgroundColor }]}>
          <TouchableOpacity onPress={navigateToFreeScreens}>
      <Text style={[styles.buttonText, styles.advance]}>Premium</Text>
    </TouchableOpacity>
    
          </Animated.View>
        </View>
        <View style={styles.funFactsContainer}>
          <Text style={styles.funFactsHeading}>Did You Know?</Text>
          <Text style={styles.funFact}>South Africa is home to the largest bird, the ostrich!</Text>
          <Text style={styles.funFact}>Table Mountain in Cape Town is one of the oldest mountains in the world.</Text>
        </View>
        {/* <TouchableOpacity style={styles.quizButton} onPress={() => navigation.navigate('AIScreen')}>
  <Text style={styles.quizButtonText}>Take a Fun Quiz!</Text>
</TouchableOpacity> */}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(4),
    backgroundColor: '#0056b3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(1),
  },
  logo: {
    width: responsiveWidth(25),
    height: responsiveHeight(20),
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#fff',
  },
  
  scrollContent: {
    paddingBottom: responsiveHeight(10),
  },
  cardList: {
    marginVertical: responsiveHeight(2),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1),
  },
  crownImage: {
    width: responsiveWidth(6),
    height: responsiveHeight(6),
    resizeMode: 'contain',
  },
  premiumText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: '#0056b3',
    marginLeft: responsiveWidth(2),
    flex: 1,
  },
  cardTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: responsiveHeight(1),
  },
  cardText: {
    fontSize: responsiveFontSize(2),
    color: '#666',
    marginBottom: responsiveHeight(0.5),
  },
  cardImage: {
    width: '100%',
    height: responsiveHeight(20),
    resizeMode: 'contain',
    marginTop: responsiveHeight(1),
  },
  premiumCard: {
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: responsiveHeight(3),
  },
  bigButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  buttonText: {
    fontSize: responsiveFontSize(2.2),
    color: 'white',
    fontWeight: 'bold',
  },
  funFactsContainer: {
    marginVertical: responsiveHeight(3),
  },
  funFactsHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: responsiveHeight(1),
  },
  funFact: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    marginBottom: responsiveHeight(0.5),
  },
  quizButton: {
    backgroundColor: '#ff6347',
    borderRadius: 10,
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
  },
  quizButtonText: {
    fontSize: responsiveFontSize(2.2),
    color: 'white',
    fontWeight: 'bold',
  },
  advance: {
    // Additional styles for advance
    color: 'black',
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
