import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { FC, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from '@assets/images/splash_logo.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import {  increment } from '@store/slice/counterSlice';
import GeoLocation from '@react-native-community/geolocation';
import { resetAndNavigate } from '@utils/NavigationUtils';
import reduxStorage from '@store/mmkvStorage/storage';
import {jwtDecode} from 'jwt-decode';
import { refetchToken, reFetchUser } from '@store/slice/authSlice';
import { RootState } from '@store/store';


GeoLocation.setRNConfiguration({
  skipPermissionRequests:false,
  authorizationLevel:'always',
  enableBackgroundLocationUpdates:true,
  locationProvider:'auto',
});

interface DecodedToken{
  exp:number;
}

const SplashScreen:FC = ()=> {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);

const tokenCheck = async()=>{
  const accessToken = await reduxStorage.getItem('accessToken');
  const refreshToken = await reduxStorage.getItem('refreshToken');

  if(accessToken){
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;

      if(decodedRefreshToken.exp < currentTime){
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session expired ,Please Login again');
        return false;
      }

      if(decodedAccessToken.exp < currentTime){
        try {
          dispatch(refetchToken());
          dispatch(reFetchUser());
          // refetchUser();
        } catch (error) {
          console.log('error',error);
          Alert.alert('There was an erroring refreshing token');
          return false;
        }
      }

      if(user?.role === 'Customer'){
        resetAndNavigate('ProductDashboard');
      }else{
        resetAndNavigate('CustomerLogin');
      }
      return false;
  }

  resetAndNavigate('CustomerLogin');
  return false;
};


  useEffect(()=>{
    const fetchUserLocation = async()=>{
      try {
        GeoLocation.requestAuthorization();
        tokenCheck();
      } catch (error) {
        Alert.alert('Sorry we need location service to give you better shopping experience');
      }
    };
    const timeOutId = setTimeout(fetchUserLocation, 2000);
    return()=>clearTimeout(timeOutId);
  });

    return (
      <View style={style.container}>
        <Image
        source={Logo}
        style={style.logoImage}
        />
        <TouchableOpacity onPress={()=>dispatch(increment())}>
          <Text>Touch it and buy coin</Text>
          <Text>{'count'}</Text>
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
