import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';

const TopicItem = ({ item, handleTopicSelect }) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();
    return () => subscription?.remove();

    const shake = () => {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]).start(() => shake());
    };
    shake();
  }, [shakeAnim]);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isPlaying) {
      setShowPlayIcon(false);
    }
  };

  const getVideoSource = (topic) => {
    switch (topic) {
      case 'mode':
        return require('../assets/videos/Mode.mp4');
      case 'probability':
        return require('../assets/videos/Probability video.mp4');
      case 'range':
        return require('../assets/videos/Range video.mp4');
      case 'mean':
        return require('../assets/videos/Mean video.mp4');
      case 'median':
        return require('../assets/videos/Median video.mp4');
      default:
        return null;
    }
  };

  const getVideoStyle = () => {
    if (orientation === 'landscape') {
      return {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      };
    }
    return styles.video;
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={[styles.topicButton, { backgroundColor: item.color }]}
        onPress={() => handleTopicSelect(item.subtopic)}
      >
        <Text style={styles.topicButtonText}>{item.title}</Text>
      </TouchableOpacity>
      {getVideoSource(item.subtopic) && (
        <View style={styles.videoContainer}>
          <Video
            source={getVideoSource(item.subtopic)}
            style={getVideoStyle()}
            resizeMode="cover"
            useNativeControls
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
          {showPlayIcon && (
            <TouchableOpacity style={styles.playIconContainer} onPress={() => setShowPlayIcon(false)}>
              <Icon name="play" size={40} color="#0056b3" />
            </TouchableOpacity>
          )}
        </View>
      )}
      <Text style={styles.practiceText}>Practice 1-10</Text>
      <View style={styles.stagesContainer}>
        {[...Array(10).keys()].map((stage) => (
          <TouchableOpacity
            key={stage}
            style={styles.stageContainer}
            onPress={() => {
              if (item.subtopic === 'mode' && stage < 3) {
                handleTopicSelect(item.subtopic);
              } else if (item.subtopic === 'mode' && stage >= 3) {
                navigation.navigate('Subscription');
              }
            }}
          >
            <View
              style={[
                styles.stageBox,
                stage === 0
                  ? styles.videoStage
                  : item.subtopic === 'mode' && stage < 3
                  ? styles.unlockedStage
                  : styles.lockedStage,
              ]}
            >
              <Animated.View
                style={stage === 0 ? { transform: [{ translateX: shakeAnim }] } : null}
              >
                <Icon
                  name={stage === 0 ? 'videocam' : item.subtopic === 'mode' && stage < 3 ? 'lock-open' : 'lock-closed'}
                  size={20}
                  color="#0056b3"
                />
              </Animated.View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    alignItems: 'center',
  },
  topicButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  topicButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  playIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  practiceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stageContainer: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 10,
  },
  stageBox: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoStage: {
    backgroundColor: '#f1c40f',
  },
  unlockedStage: {
    backgroundColor: '#2ecc71',
  },
  lockedStage: {
    backgroundColor: '#e74c3c',
  },
});

export default TopicItem;
