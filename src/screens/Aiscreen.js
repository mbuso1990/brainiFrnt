import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import OpenAI from 'openai';
import * as Keychain from 'react-native-keychain';

const AIScreen = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();

                if (!credentials) {
                    throw new Error('Credentials not found');
                }

                const apiKey = credentials.password;

                const openai = new OpenAI({
                    apiKey,
                });

                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: "Give a quiz question about South Africa with 4 options and indicate the correct answer." }
                    ],
                    model: "gpt-3.5-turbo",
                });

                const responseText = completion.choices[0].message.content;

                // Assuming the responseText is in a JSON format with question, options, and correctAnswer keys
                const response = JSON.parse(responseText);

                setQuestion(response.question);
                setOptions(response.options);
                setCorrectAnswer(response.correctAnswer);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    Alert.alert('Quota Exceeded', 'You have exceeded your API quota. Please check your plan and billing details.');
                } else {
                    console.error(error);
                }
            }
        };

        fetchQuestion();
    }, []);

    const handleAnswer = (selectedOption) => {
        if (selectedOption === correctAnswer) {
            Alert.alert('Correct!', 'You answered the question correctly.');
        } else {
            Alert.alert('Incorrect!', 'You answered the question incorrectly.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{question}</Text>
            {options.map((option, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(option)}>
                    <Text style={styles.buttonText}>{option.toString()}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    questionText: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default AIScreen;
