
import React from 'react';
import {  StyleSheet, Text, View } from 'react-native';

const ProductCategories = () => {
  return (
    <View>
      <Text>{'ProductCategories'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ProductCategories;
