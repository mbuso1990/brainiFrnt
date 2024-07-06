import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Modal, Button } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import QuizImage1 from '../assets/1.svg';
import QuizImage2 from '../assets/free2.svg';
import QuizImage3 from '../assets/free3.svg';
import QuizImage4 from '../assets/free4.svg';
import QuizImage5 from '../assets/free5.svg';
import ProgressBar from '../components/ProgressBar';

const questions = [
  { image: QuizImage1, question: 'What is shown in the picture?', options: [
    { id: 1, text: 'Option 1', isCorrect: true },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: false },
    { id: 4, text: 'Option 4', isCorrect: false },
  ]},
  { image: QuizImage2, question: 'What is the big animal here?', options: [
    { id: 1, text: 'Dog', isCorrect: false },
    { id: 2, text: 'Elephant', isCorrect: true },
    { id: 3, text: 'Cat', isCorrect: false },
    { id: 4, text: 'Rabbit', isCorrect: false },
  ]},
  { image: QuizImage3, question: 'What is shown in the picture?', options: [
    { id: 1, text: 'Option 1', isCorrect: true },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: false },
    { id: 4, text: 'Option 4', isCorrect: false },
  ]},
  { image: QuizImage4, question: 'What is shown in the picture?', options: [
    { id: 1, text: 'Option 1', isCorrect: true },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: false },
    { id: 4, text: 'Option 4', isCorrect: false },
  ]},
  { image: QuizImage5, question: 'What is shown in the picture?', options: [
    { id: 1, text: 'Option 1', isCorrect: true },
    { id: 2, text: 'Option 2', isCorrect: false },
    { id: 3, text: 'Option 3', isCorrect: false },
    { id: 4, text: 'Option 4', isCorrect: false },
  ]},
];

const HiScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [triesLeft, setTriesLeft] = useState(1);
  const dropZone = useRef(null);
  const dropZoneCoords = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalBackgroundColor, setModalBackgroundColor] = useState('');
  const [droppedOptions, setDroppedOptions] = useState(new Array(questions[0].options.length).fill(false));
  const panArray = useRef(questions.map(q => q.options.map(() => new Animated.ValueXY()))).current;
  const modalTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
      }
    };
  }, []);

  const resetOptionPositions = () => {
    panArray.forEach(questionPans => {
      questionPans.forEach(pan => {
        pan.setValue({ x: 0, y: 0 });
        pan.setOffset({ x: 0, y: 0 });
      });
    });
  };

  const handleDrop = (event, option, index) => {
    const { absoluteX, absoluteY } = event.nativeEvent;
    const { x, y, width, height } = dropZoneCoords.current;

    if (
      absoluteX >= x &&
      absoluteX <= x + width &&
      absoluteY >= y &&
      absoluteY <= y + height
    ) {
      if (option.isCorrect) {
        panArray[currentQuestionIndex][index].setOffset({
          x: panArray[currentQuestionIndex][index].x._value,
          y: panArray[currentQuestionIndex][index].y._value,
        });
        panArray[currentQuestionIndex][index].setValue({ x: 0, y: 0 });

        const newDroppedOptions = [...droppedOptions];
        newDroppedOptions[index] = true;
        setDroppedOptions(newDroppedOptions);

        setModalMessage('Excellent!');
        setModalBackgroundColor('lightgreen');
        setScore(prevScore => prevScore + 1);
        setShowModal(true);

        modalTimeoutRef.current = setTimeout(() => {
          setShowModal(false);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => {
              setDroppedOptions(new Array(questions[prevIndex + 1].options.length).fill(false));
              resetOptionPositions();
              setProgress(((prevIndex + 1) / questions.length) * 100);
              setTriesLeft(1);
              return prevIndex + 1;
            });
          } else {
            setProgress(100);
            setShowModal(true);
            setModalMessage(`Quiz Completed! Your Score: ${score + 1}/${questions.length}`);
            setModalBackgroundColor('blue');
          }
        }, 1000);
      } else {
        setModalMessage('Incorrect Answer. Try again.');
        setModalBackgroundColor('red');
        setShowModal(true);
        setTriesLeft(prevTries => prevTries - 1);

        Animated.spring(panArray[currentQuestionIndex][index], {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();

        modalTimeoutRef.current = setTimeout(() => {
          setShowModal(false);
        }, 1000);
      }
    } else {
      Animated.spring(panArray[currentQuestionIndex][index], {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setProgress(0);
    setScore(0);
    setTriesLeft(1);
    setDroppedOptions(new Array(questions[0].options.length).fill(false));
    resetOptionPositions();
    setShowModal(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const QuizImage = currentQuestion.image;

  return (
    <View style={styles.container} key={currentQuestionIndex}>
      <ProgressBar progress={progress} />
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      <QuizImage width={300} height={200} style={styles.quizImage} />
      <View
        ref={dropZone}
        style={styles.dropZone}
        onLayout={() => {
          dropZone.current.measure((x, y, width, height, pageX, pageY) => {
            dropZoneCoords.current = { x: pageX, y: pageY, width, height };
          });
        }}
      >
        <Text style={styles.dropZoneText}>Drop Here</Text>
      </View>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <PanGestureHandler
            key={option.id}
            enabled={!droppedOptions[index]}
            onGestureEvent={Animated.event(
              [{ nativeEvent: { translationX: panArray[currentQuestionIndex][index].x, translationY: panArray[currentQuestionIndex][index].y } }],
              { useNativeDriver: false }
            )}
            onHandlerStateChange={(event) => {
              if (event.nativeEvent.state === State.END) {
                handleDrop(event, option, index);
              }
            }}
          >
            <Animated.View
              style={[
                styles.optionCard,
                {
                  transform: [
                    { translateX: panArray[currentQuestionIndex][index].x },
                    { translateY: panArray[currentQuestionIndex][index].y },
                  ],
                },
              ]}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </Animated.View>
          </PanGestureHandler>
        ))}
      </View>
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: modalBackgroundColor }]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            {currentQuestionIndex === questions.length - 1 && (
              <Button title="Try Again" onPress={handleTryAgain} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 100,
    marginBottom: 20,
  },
  quizImage: {
    marginBottom: 20,
  },
  dropZone: {
    width: 300,
    height: 110,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dropZoneText: {
    fontSize: 18,
    color: '#000',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionCard: {
    width: 140,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 200,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HiScreen;
