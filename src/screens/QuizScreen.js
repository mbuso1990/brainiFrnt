import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Animated, Dimensions, Image } from 'react-native';
import { GameContext } from '../context/GameContext';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import GifImage from 'react-native-gif';

const { width, height } = Dimensions.get('window');

const QuizScreen = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [notification, setNotification] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const { completeModeLevel } = useContext(GameContext);
  const { user, logout } = useContext(AuthContext);
  const route = useRoute();
  const { subtopic, levels } = route.params;
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [goodAnswerModalVisible, setGoodAnswerModalVisible] = useState(false);
  const [modalY] = useState(new Animated.Value(height));
  const [dragY] = useState(new Animated.Value(0));
  const [timeSpent, setTimeSpent] = useState(0);
  const navigation = useNavigation();
  const timerRef = useRef(null);
  const dropZoneValues = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const draggedItem = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [unlimitedModalVisible, setUnlimitedModalVisible] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const slideOpacity = useRef(new Animated.Value(1)).current;
  const slideTranslateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setTimeSpent(7);
    }, 7000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, currentLevelIndex]);

  useEffect(() => {
    if (levels[currentLevelIndex].slides[currentSlideIndex].image) {
      console.log(`${levels[currentLevelIndex].slides[currentSlideIndex].image}`);
    }
    console.log('User:', user);
  }, [currentSlideIndex, currentLevelIndex, levels]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnlimitedModalVisible(true);
    }, 60000); // Show the popup after 1 minute (60,000 milliseconds)

    return () => clearTimeout(timer); // Clear the timeout when the component unmounts
  }, []); // Empty dependency array to run the effect only once when the component mounts

  if (!levels || levels.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentLevel = levels[currentLevelIndex];
  const currentSlide = currentLevel.slides[currentSlideIndex];

  const saveAnswersToDB = async (selectedAnswers, currentLevel, currentSlide) => {
    try {
      console.log('User:', user);

      console.log('Request payload:', {
        userId,
        level: currentLevel.level,
        slide: currentSlide.slideNo,
        answers: selectedAnswers,
      });

      const userId = user && user._id ? user._id : "user123";

      await axios.post('https://brainni.onrender.com/api/answers/submit', {
        userId,
        level: currentLevel.level,
        slide: currentSlide.slideNo,
        answers: selectedAnswers,
      });
      console.log('Answers saved to database');
    } catch (error) {
      console.error('Error saving answers:', error);
    }
  };

  const proceedToNextSlide = () => {
    setConfirmModalVisible(false);
    setGoodAnswerModalVisible(false);

    if (selectedAnswers.length > 0) {
      saveAnswersToDB(selectedAnswers, currentLevel, currentSlide);
    }

    if (currentSlideIndex < currentLevel.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      completeModeLevel(currentLevelIndex);
      if (currentLevelIndex < levels.length - 1) {
        setCurrentLevelIndex(currentLevelIndex + 1);
        setCurrentSlideIndex(0);
      } else {
        alert('You have completed all levels!');
      }
    }
    setTimeSpent(0);
  };

  const handleNext = () => {
    if (timeSpent < 7) {
      setConfirmModalVisible(true);
    } else {
      animateSlideOut();
    }
  };
  const animateSlideOut = () => {
    Animated.timing(slideOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      slideTranslateX.setValue(width);
      proceedToNextSlide();
      animateSlideIn();
    });
  };

  const animateSlideIn = () => {
    Animated.parallel([
      Animated.timing(slideOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleViewProgress = () => {
    setModalVisible(true);
    Animated.timing(modalY, {
      toValue: height * 0.1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(modalY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: dragY } }],
    { useNativeDriver: true }
  );

  const handleGestureStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100) {
        handleCloseModal();
      } else {
        Animated.timing(dragY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const translateY = Animated.add(modalY, dragY);

  const setDropZoneValues = (event) => {
    dropZoneValues.current = event.nativeEvent.layout;
  };

  const checkIfCorrect = () => {
    if (currentSlide.correctAnswer === draggedItem.current) {
      setGoodAnswerModalVisible(true);
      setTimeout(() => {
        setNotification(true);
      }, 3000); // Show notification after 3 seconds

      setSelectedAnswers([...selectedAnswers, draggedItem.current]);
      saveAnswersToDB(selectedAnswers, currentLevel, currentSlide);
      setShowGif(true); // Show the GIF
    } else {
      alert('Wrong answer. Try again.');
    }
    pan.setValue({ x: 0, y: 0 });
    draggedItem.current = null;
    setDragging(false);
  };

  const handleRelease = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    const dropZone = dropZoneValues.current;

    const isInDropZone =
      dropZone &&
      pageY >= dropZone.y &&
      pageY <= dropZone.y + dropZone.height &&
      pageX >= dropZone.x &&
      pageX <= dropZone.x + dropZone.width;

    const relativeX = pageX - dropZone.x - 50;
    const relativeY = pageY - dropZone.y - 50;
    const item = draggedItem.current;

    if (isInDropZone) {
      setSelectedAnswers((prev) => [...prev, item]);
      console.log(`Selected answer: ${item}`);
    }

    setDroppedItems((prev) => [...prev, { item, x: relativeX, y: relativeY }]);

    checkIfCorrect();

    if (!isInDropZone) {
      pan.setValue({ x: 0, y: 0 });
      draggedItem.current = null;
      setDragging(false);
    }
  };

  const dragItems = currentSlide.dragItems ? currentSlide.dragItems.map((item, index) => (
<PanGestureHandler
  key={index}
  onGestureEvent={Animated.event([{ nativeEvent: { translationX: pan.x, translationY: pan.y } }], { useNativeDriver: false })}
  onHandlerStateChange={(event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      handleRelease(event);
    }
    if (event.nativeEvent.state === State.ACTIVE && !dragging) {
      setDragging(true);
      draggedItem.current = item;
      console.log(`Selecting answer: ${item}`);
    }
  }}
  enabled={!dragging || draggedItem.current === item}
>
      <Animated.View style={[styles.draggable, { transform: [{ translateX: dragging && draggedItem.current === item ? pan.x : 0 }, { translateY: dragging && draggedItem.current === item ? pan.y : 0 }] }]}>
        <Text style={styles.dragItemText}>{item}</Text>
      </Animated.View>
    </PanGestureHandler>
  )) : null;

  const isUserPaid = () => {
    return user && user.hasPaid;
  };

  const handleGoUnlimited = () => {
    if (!isUserPaid()) {
      navigation.navigate('Package');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.levelInfo}>
          <TouchableOpacity style={styles.iconButton} onPress={handleViewProgress}>
            <FontAwesome name="line-chart" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.levelText}>Level {currentLevel.level}</Text>
        </View>
      </View>
      <Animated.View
        style={[
          styles.slideContainer,
          {
            opacity: slideOpacity,
            transform: [{ translateX: slideTranslateX }],
          },
        ]}
      >
        <Text style={styles.questionText}>{currentSlide.text}</Text>
        {currentSlide.image && (
          <Animated.Image
            source={{ uri: `${levels[currentLevelIndex].slides[currentSlideIndex].image}` }}
            style={styles.slideImage}
            resizeMode="contain"
          />
        )}
        {currentSlide.slideNo === 3 && (
          <View style={styles.dropZone} onLayout={setDropZoneValues}>
            <Text style={styles.dropZoneText}>Drop Here</Text>
          </View>
        )}
        <View style={styles.dragItemsContainer}>
          {dragItems}
        </View>
      </Animated.View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {modalVisible && (
        <Modal
          visible={modalVisible}
          animationType="none"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackdrop}>
            <PanGestureHandler
              onGestureEvent={handleGestureEvent}
              onHandlerStateChange={handleGestureStateChange}
            >
              <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Progress</Text>
                <FlatList
                  data={levels}
                  keyExtractor={(item) => item.level.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.levelProgress}>
                      <Text style={styles.levelProgressText}>Level {item.level}</Text>
                      <FontAwesome
                        name={index <= currentLevelIndex ? "check-circle" : "circle-o"}
                        size={24}
                        color={index <= currentLevelIndex ? "#4caf50" : "#ccc"}
                      />
                    </View>
                  )}
                />
              </Animated.View>
            </PanGestureHandler>
          </View>
        </Modal>
      )}

      {confirmModalVisible && (
        <Modal
          visible={confirmModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setConfirmModalVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.confirmModalContainer}>
              <Text style={styles.confirmText}>You need to spend at least 7 seconds on each slide before proceeding. Please wait a bit longer.</Text>
              <TouchableOpacity style={styles.confirmButton} onPress={() => setConfirmModalVisible(false)}>
                <Text style={styles.confirmButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

{goodAnswerModalVisible && (
  <Modal
    visible={goodAnswerModalVisible}
    animationType="fade"
    transparent={true}
    onRequestClose={() => setGoodAnswerModalVisible(false)}
  >
    <View style={styles.modalBackdrop}>
      <View style={styles.confirmModalContainer}>
        <Text style={styles.confirmText}>Good job! You got the correct answer.</Text>
        {showGif && (
          <GifImage
            source={require('../assets/gif.gif')}
            style={{ width: 200, height: 200 }}
          />
        )}
        <TouchableOpacity style={styles.confirmButton} onPress={proceedToNextSlide}>
          <Text style={styles.confirmButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

      {unlimitedModalVisible && !isUserPaid() && (
        <Modal
          visible={unlimitedModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setUnlimitedModalVisible(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.confirmModalContainer}>
              <Text style={styles.confirmText}>Your child has completed all free activities for the day.</Text>
              <TouchableOpacity style={styles.confirmButton} onPress={handleGoUnlimited}>
                <Text style={styles.confirmButtonText}>Go Unlimited</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: '#34495e',
  },
  iconButton: {
    padding: 10,
  },
  levelInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 20,
    color: '#fff',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
  questionText: {
    fontSize: 24,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 20,
  },
  slideImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  dropZone: {
    height: 100,
    width: 300, // Increase the width as needed
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  dropZoneText: {
    color: '#fff',
    fontSize: 18,
  },
  dragItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  draggable: {
    backgroundColor: '#e74c3c',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: width / 2 - 40,
    alignItems: 'center',
  },
  dragItemText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  levelProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  levelProgressText: {
    fontSize: 18,
  },
  confirmModalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  notification: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 16,
  },
  modalGifBackdrop: {
    zIndex: 9999,
  },
  modalGifContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalGif: {
    width: 200,
    height: 200,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
  questionText: {
    fontSize: 24,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  dropZone: {
    height: 100,
    width: 300,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  dragItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default QuizScreen;
