import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TopicItem from './TopicItem';

const TopicList = ({ topics, handleTopicSelect }) => {
  return (
    <FlatList
      data={topics}
      renderItem={({ item }) => <TopicItem item={item} handleTopicSelect={handleTopicSelect} />}
      keyExtractor={(item) => item.subtopic}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default TopicList;
