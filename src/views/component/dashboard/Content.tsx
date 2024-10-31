
import { adData } from '@utils/dummyData';
import React  from 'react';
import {  StyleSheet, Text, View } from 'react-native';

const Content = () => {


  return (
    <View style={styles.container}>
      {/* <AdCarousal adData={adData}> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  paddingHorizontal:20,
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Content;
