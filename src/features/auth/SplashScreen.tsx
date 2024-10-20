import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from '@assets/images/splash_logo.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import {  increment } from '@store/slice/counterSlice';
import type { RootState } from '@store/store'


const SplashScreen:FC = ()=> {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
    return (
      <View style={style.container}>
        <Image
        source={Logo}
        style={style.logoImage}
        />
        <TouchableOpacity onPress={()=>dispatch(increment())}>
          <Text>Touch it and buy coin</Text>
          <Text>{count}</Text>
        </TouchableOpacity>
      </View>
    );
};

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primary,
        alignItems:'center',
        justifyContent:'center',
    },
    logoImage:{
        height:screenHeight * 0.7,
        width:screenWidth * 0.7,
        resizeMode:'contain',
    },
});
export default SplashScreen;
