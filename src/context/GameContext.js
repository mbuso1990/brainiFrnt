import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creating the GameContext
export const GameContext = createContext();

const API_URL = 'https://brainni.onrender.com'; // Update with your backend server's IP address and port

export const GameContextProvider = ({ children }) => {
  const [modeLevels, setModeLevels] = useState([]);
  const [medianLevels, setMedianLevels] = useState([]);
  const [meanLevels, setMeanLevels] = useState([]);
  const [perimeterLevels, setPerimeterLevels] = useState([]);
  const [probabilityLevels, setProbabilityLevels] = useState([]);
  const [commonFractionsLevels, setCommonFractionsLevels] = useState([]);
  const [rangeLevels, setRangeLevels] = useState([]);
  const [decimalLevels, setDecimalLevels] = useState([]);
  const [areaLevels, setAreaLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/topics`, {
          withCredentials: true
        });
        const topics = response.data;

        const topicNameToSetter = {
          Mode: setModeLevels,
          Median: setMedianLevels,
          Mean: setMeanLevels,
          Perimeter: setPerimeterLevels,
          Probability: setProbabilityLevels,
          CommonFractions: setCommonFractionsLevels,
          Range: setRangeLevels,
          Decimal: setDecimalLevels,
          Area: setAreaLevels,
        };

        topics.forEach(topic => {
          const setLevels = topicNameToSetter[topic.name];
          if (setLevels) {
            const updatedLevels = topic.levels.map(level => ({
              ...level,
              slides: level.slides.map(slide => {
                // Create the relative image path
                const imagePath = `${slide.image}`;
              console.log(imagePath)
                return { ...slide, image: imagePath };
              })
            }));

            setLevels(updatedLevels);
          }
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const completeLevel = (setLevels, levelIndex) => {
    setLevels(prevLevels => {
      const updatedLevels = [...prevLevels];
      updatedLevels[levelIndex].completed = true;
      return updatedLevels;
    });
  };

  return (
    <GameContext.Provider value={{
      modeLevels, completeModeLevel: (index) => completeLevel(setModeLevels, index),
      medianLevels, completeMedianLevel: (index) => completeLevel(setMedianLevels, index),
      meanLevels, completeMeanLevel: (index) => completeLevel(setMeanLevels, index),
      perimeterLevels, completePerimeterLevel: (index) => completeLevel(setPerimeterLevels, index),
      probabilityLevels, completeProbabilityLevel: (index) => completeLevel(setProbabilityLevels, index),
      commonFractionsLevels, completeCommonFractionsLevel: (index) => completeLevel(setCommonFractionsLevels, index),
      rangeLevels, completeRangeLevel: (index) => completeLevel(setRangeLevels, index),
      decimalLevels, completeDecimalLevel: (index) => completeLevel(setDecimalLevels, index),
      areaLevels, completeAreaLevel: (index) => completeLevel(setAreaLevels, index)
    }}>
      {children}
    </GameContext.Provider>
  );
};
