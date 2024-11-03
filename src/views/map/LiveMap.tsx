// LiveMap
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';

const LiveMap = () => {


  return (
    <View style={styles.container}>
      <Text>{'LiveMap'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:screenHeight * 0.35,
    width:'100%',
    borderRadius:15,
    backgroundColor:'#fff',
    overflow:'hidden',
    borderWidth:1,
    borderColor:Colors.border,
    position:'relative',
  },
});

export default LiveMap;
