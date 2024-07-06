import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const ConfettiTest = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeoutRef = useRef(null);

  const handlePress = () => {
    setShowConfetti(true);
    confettiTimeoutRef.current = setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <View style={styles.container}>
      <Button title="Show Confetti" onPress={handlePress} />
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: 0, y: 0 }}
          fallSpeed={3000}
          explosionSpeed={1000}
          fadeOut={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfettiTest;
