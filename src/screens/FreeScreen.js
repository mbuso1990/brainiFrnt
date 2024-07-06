import React, { useState, useEffect, useRef, useContext, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GameContext } from '../context/GameContext';
import profileImage from '../assets/brain_profile.png';
import { Dropdown } from 'react-native-element-dropdown';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AuthContext } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const topics = [
  { title: 'Mode', color: '#0056b3', subtopic: 'mode' },
  { title: 'Median', color: '#0056b3', subtopic: 'median' },
  { title: 'Mean', color: '#0056b3', subtopic: 'mean' },
  { title: 'Range', color: '#0056b3', subtopic: 'range' },
  { title: 'Probability', color: '#0056b3', subtopic: 'probability' },
  { title: 'Area of 2D shapes', color: '#0056b3', subtopic: 'area' },
  { title: 'Perimeter of 2D shapes', color: '#0056b3', subtopic: 'perimeter' },
  { title: 'Common fractions', color: '#0056b3', subtopic: 'common_fractions' },
  { title: 'Decimal fractions', color: '#0056b3', subtopic: 'decimal' },
];

const FreeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { title = 'Grade 7' } = route.params || {};
  const { user, logout } = useContext(AuthContext);
  const {
    modeLevels,
    medianLevels,
    meanLevels,
    rangeLevels,
    probabilityLevels,
    areaLevels,
    perimeterLevels,
    commonFractionsLevels,
    decimalLevels,
  } = useContext(GameContext);

  const handleTopicSelect = (subtopic) => {
    switch (subtopic) {
      case 'mode':
        navigation.navigate('QuizScreen', { subtopic, levels: modeLevels });
        break;
      case 'median':
        navigation.navigate('QuizScreen', { subtopic, levels: medianLevels });
        break;
      case 'mean':
        navigation.navigate('QuizScreen', { subtopic, levels: meanLevels });
        break;
      case 'range':
        navigation.navigate('QuizScreen', { subtopic, levels: rangeLevels });
        break;
      case 'probability':
        navigation.navigate('QuizScreen', { subtopic, levels: probabilityLevels });
        break;
      case 'area':
        navigation.navigate('QuizScreen', { subtopic, levels: areaLevels });
        break;
      case 'perimeter':
        navigation.navigate('QuizScreen', { subtopic, levels: perimeterLevels });
        break;
      case 'common_fractions':
        navigation.navigate('QuizScreen', { subtopic, levels: commonFractionsLevels });
        break;
      case 'decimal':
        navigation.navigate('QuizScreen', { subtopic, levels: decimalLevels });
        break;
      default:
        navigation.navigate('VideoPlayer', { subtopic });
    }
  };

  const TopicItem = ({ item, handleTopicSelect }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      const subscription = ScreenOrientation.addOrientationChangeListener(({ nativeEvent }) => {
        if (nativeEvent.orientationInfo.orientation === 'LANDSCAPE') {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
      });

      return () => subscription.remove();
    }, []);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.topicButton, { backgroundColor: item.color }]}
          onPress={() => handleTopicSelect(item.subtopic)}
        >
          <Text style={styles.topicButtonText}>{item.title}</Text>
        </TouchableOpacity>
        <Text style={styles.practiceText}>Practice 1-10</Text>
        <View style={styles.stagesContainer}>
          {[...Array(10).keys()].map((stage) => (
            <TouchableOpacity key={stage} style={styles.stageContainer}>
              <View style={[styles.stageBox, styles.unlockedStage]}>
                <Icon name="book-outline" size={20} color="#fff" />
                <Text style={styles.levelText}>Level {stage + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label, isFocus && { color: 'blue' }]}>Dropdown label</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <View>
          <Icon name="arrow-back" size={20} color="#0056b3" />
        </View>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        {user ? (
          <>
            <Text style={styles.text}>Welcome: {user.username}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>No user data available</Text>
        )}
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={() => setIsFocus(!isFocus)}>
        <View style={styles.iconContainer}>
          <Icon name="ellipsis-horizontal" size={20} color="#0056b3" />
        </View>
      </TouchableOpacity>

      {isFocus && (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={[
            { label: 'Home', value: 'home' },
            { label: 'Profile', value: 'profile' },
          ]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
            if (item.value === 'home') {
              navigation.navigate('Home');
            } else if (item.value === 'profile') {
              navigation.navigate('Profile');
            }
          }}
          renderLeftIcon={() => <Icon style={styles.icon} color={isFocus ? 'blue' : 'black'} name="book-outline" size={20} />}
        />
      )}

      <FlatList
        data={topics}
        keyExtractor={(item) => item.subtopic}
        renderItem={({ item }) => (
          <TopicItem item={item} handleTopicSelect={handleTopicSelect} />
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginLeft: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#0056b3',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  settingsButton: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  practiceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  stagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stageContainer: {
    width: '48%',
    marginBottom: 10,
  },
  stageBox: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedStage: {
    backgroundColor: '#0056b3',
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FreeScreen;
