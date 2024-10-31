
import React, { useEffect, useRef } from 'react';
import { Animated as RNanimated, SafeAreaView, StyleSheet } from 'react-native';
import NoticeAnimation from './noticeAnimation/NoticeAnimation';
import { NoticeHeight } from '@utils/Scaling';
import Visuals from './Visuals';
import { CollapsibleContainer, CollapsibleHeaderContainer, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';


const NOTICE_HEIGHT = -[NoticeHeight + 12];


const ProductDashboard = ()=> {

  const noticePosition = useRef(new RNanimated.Value(NOTICE_HEIGHT)).current;


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
         <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
                <AnimatedHeader
                  showNotice={()=>{
                    slideDown();
                    const timeOutId = setTimeout(() => {
                      slideUp();
                    }, 3000);
                    return()=>clearTimeout(timeOutId);
                  }}
                />
                <StickSearchBar/>
          </CollapsibleHeaderContainer>
         </CollapsibleContainer>
        </>
      </NoticeAnimation>
    );
};
export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
  panelContainer:{
    flex:1,
  },
  transparent:{
    backgroundColor:'transparent',
  },
});
