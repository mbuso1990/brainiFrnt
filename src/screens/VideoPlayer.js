import React, { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import { StyleSheet, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const VideoPlayer = ({ source }) => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();
    return () => subscription?.remove();
  }, []);

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
    <View style={styles.container}>
      <Video
        source={source}
        style={getVideoStyle()}
        resizeMode="cover"
        useNativeControls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default VideoPlayer;
