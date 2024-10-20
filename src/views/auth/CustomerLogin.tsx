import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@views/component/CustomSafeAreaView';

const CustomerLogin:FC = ()=> {
    return (
      <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
      <CustomSafeAreaView>
        <Text> CustomerLogin </Text>
        </CustomSafeAreaView>
      </View>
      </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#faf',
  },
});
export default CustomerLogin;