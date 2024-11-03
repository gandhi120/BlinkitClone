import CustomText from '@components/ui/CustomText';
import { RootState } from '@store/store';
import { Colors, Fonts } from '@utils/Constants';
import { replace } from '@utils/NavigationUtils';
import { screenWidth } from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import React, { FC, useEffect } from 'react';
import {  StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const OrderSuccess:FC = () => {

    const {user} = useSelector((state: RootState) => state.auth);

    useEffect(()=>{
        const timeId = setTimeout(() => {
                replace('LiveTracking');
        }, 2300);
        return () => clearTimeout(timeId);
    },[]);

  return (
    <View style={styles.container}>
      <LottieView
      source={require('@assets/animations/confirm.json')}
      autoPlay
      duration={2000}
      loop={false}
      speed={1}
      style={styles.lottieView}
      enableMergePathsAndroidForKitKatAndAbove
      hardwareAccelerationAndroid
      />

      <CustomText variant="h8" fontFamily={Fonts.SemiBold} style={styles.orderPlacedText}>
        ORDER PLACED
      </CustomText>

      <View style={styles.deliveryContainer}>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold} style={styles.deliveryText}>
            Delivering to Home
        </CustomText>

      </View>

      <CustomText variant="h8" style={styles.addressText} fontFamily={Fonts.Medium}>
            {user?.address || 'Somewhere, Anywhere'}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    width:screenWidth * 0.6,
    height:150,
  },
  orderPlacedText:{
    opacity:0.4,
  },
  deliveryContainer:{
    borderBottomWidth:2,
    paddingBottom:4,
    marginBottom:5,
    borderColor:Colors.secondary,
  },
  deliveryText:{
    marginTop:15,
    borderColor:Colors.secondary,
  },
  addressText:{
    opacity:0.8,
    textAlign:'center',
    width:'80%',
    marginTop:10,
  },
});

export default OrderSuccess;
