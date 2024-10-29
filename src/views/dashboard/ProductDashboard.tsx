
import React, { useEffect, useRef } from 'react';
import { Animated as RNanimated, SafeAreaView, Text, View } from 'react-native';
import NoticeAnimation from './noticeAnimation/NoticeAnimation';
import { NoticeHeight } from '@utils/Scaling';
import Visuals from './Visuals';


const NOTICE_HEIGHT = -[NoticeHeight + 12];
console.log('NOTICE_HEIGHT',NOTICE_HEIGHT);


const ProductDashboard = ()=> {

  const noticePosition = useRef(new RNanimated.Value(NOTICE_HEIGHT)).current;
  console.log('NOTICE_HEIGHT:noticePosition',noticePosition);


  const slideUp = ()=>{
    RNanimated.timing(noticePosition,{
      toValue:NOTICE_HEIGHT,
      duration:1200,
      useNativeDriver:false,
    }).start();
  };

  const slideDown = ()=>{
    RNanimated.timing(noticePosition,{
      toValue:0,
      duration:1200,
      useNativeDriver:false,
    }).start();
  };

  useEffect(()=>{
    slideDown();
    const timeOutId = setTimeout(() => {
      slideUp();
    }, 3000);
    return ()=>clearTimeout(timeOutId);
  },[]);




    return (
      <NoticeAnimation noticePosition={noticePosition}>
        <>
        <Visuals/>
        <SafeAreaView/>
          <View style={{flex:1}}>
            <Text> {'ProductDashboard'} </Text>
          </View>
        </>
      </NoticeAnimation>
    );
};
export default ProductDashboard;
