import React, { FC, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Keyboard, View } from 'react-native';
import {GestureHandlerRootView, PanGestureHandler, State} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@views/component/CustomSafeAreaView';
import ProductSlider from '@views/component/login/ProductSlider/productSlider';
import styles from './styles';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyBoardOffsetHeight from '@utils/useKeyBoardOffsetheight';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@store/slice/authSlice';

const bottomColors = [...lightColors].reverse();

const CustomerLogin:FC = ()=> {

const dispatch = useDispatch();
const [phoneNumber,setPhoneNumber] = useState('9106562012');
const [loading,setLoading] = useState(false);
const[gestureSequence,setGestureSequence] = useState<string[]>([]);
const keyBoardOffsetHeight = useKeyBoardOffsetHeight();


const animatedValue = useRef(new Animated.Value(0)).current;


useEffect(()=>{
  if(keyBoardOffsetHeight === 0){
    Animated.timing(animatedValue,{
      toValue:0,
      duration:200,
      useNativeDriver:true,
    }).start();
  }else{
    Animated.timing(animatedValue,{
      toValue:-keyBoardOffsetHeight * 0.84,
      duration:1000,
      useNativeDriver:true,
    }).start();
  }
},[keyBoardOffsetHeight,animatedValue]);

const handleAuth = async()=>{
  Keyboard.dismiss();
  setLoading(true);
  try {
    dispatch(fetchUser(phoneNumber));
    // await customerLogin(phoneNumber);
    setTimeout(() => {
      resetAndNavigate('ProductDashboard');
    }, 500);

  } catch (error) {
    Alert.alert('Login Failed');
  }finally{
    setLoading(false);
  }
};


  const handleGesture = ({nativeEvent}:any)=>{
    if(nativeEvent.state === State.END){
      const{translationX,translationY} = nativeEvent;
      let direction = '';
      if(Math.abs(translationX) > Math.abs(translationY)){
        direction = translationX > 0 ? 'right' : 'left';
      }else{
        direction = translationY > 0 ? 'down' : 'up';
    }
    const newSequence = [...gestureSequence,direction].slice(-5);
    setGestureSequence(newSequence);
    if(newSequence.join(' ') === 'up up down left right'){
      setGestureSequence([]);
      resetAndNavigate('DeliveryLogin');
    }
    }
  };

    return (
      <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider/>
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
          bounces={false}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.subContainer}
          style={{transform:[{translateY:animatedValue}]}}
          >
            <LinearGradient colors={bottomColors} style={styles.gradient}/>
            <View style={styles.content}>
              <Image source={require('@assets/images/logo.png')} style={styles.logo}/>
              <CustomText
                  variant="h2"
                  fontFamily={Fonts.Bold}>
                    India's last minute app
                </CustomText>
              <CustomText
                    variant="h5"
                    fontFamily={Fonts.SemiBold}
                     style={styles.text}>Log in or sign up
                  </CustomText>
              <CustomInput
              onChangeText={(text)=>{setPhoneNumber(text.slice(0,10));}}
              onClear={()=>setPhoneNumber('')}
              value={phoneNumber}
              left={
                <CustomText
                    style={styles.phoneText}
                    variant="h6"
                    fontFamily={Fonts.SemiBold}>
                +91
                </CustomText>
                }
              placeholder="Enter mobile number"
              inputMode="numeric"
              />
              <CustomButton
                    title="Continue"
                    disabled={phoneNumber.length !== 10}
                    onPress={()=>handleAuth()}
                    loading={loading}
              />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
        </CustomSafeAreaView>
      </View>
      </GestureHandlerRootView>
    );
};

export default CustomerLogin;
