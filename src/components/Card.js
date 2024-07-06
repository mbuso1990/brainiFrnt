import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';

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
        {isPremium && (
          <TouchableOpacity style={styles.premiumStartButton}>
            <Text style={styles.premiumStartButtonText}>Start Now</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    height: 160,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1),
  },
  crownImage: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    resizeMode: 'contain',
  },
  premiumText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
  cardText: {
    fontSize: responsiveFontSize(2),
    color: '#555555',
    textAlign: 'center',
    marginBottom: responsiveHeight(0.5),
  },
  cardImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(12),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: responsiveHeight(1),
  },
  premiumStartButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: responsiveHeight(1),
    marginTop: responsiveHeight(2),
    width: '80%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ff9800',
  },
  premiumStartButtonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#ff9800',
    textAlign: 'center',
  },
});

export default Card;
