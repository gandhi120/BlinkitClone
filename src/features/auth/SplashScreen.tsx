import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { FC, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from '@assets/images/splash_logo.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import {  increment } from '@store/slice/counterSlice';
import type { RootState } from '@store/store';
import GeoLocation from '@react-native-community/geolocation';

GeoLocation.setRNConfiguration({
  skipPermissionRequests:false,
  authorizationLevel:'always',
  enableBackgroundLocationUpdates:true,
  locationProvider:'auto',
});

const SplashScreen:FC = ()=> {

  useEffect(()=>{
    const fetchUserLocation = async()=>{
      try {
        GeoLocation.requestAuthorization();
      } catch (error) {
        Alert.alert('Sorry we need location service to give you better shopping experience');
      }
    };
    const timeOutId = setTimeout(fetchUserLocation, 2000);
    return()=>clearTimeout(timeOutId);
  });
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
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
