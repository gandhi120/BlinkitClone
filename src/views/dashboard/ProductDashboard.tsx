
import React, { useEffect, useRef } from 'react';
import { Platform, Animated as RNanimated, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import NoticeAnimation from './noticeAnimation/NoticeAnimation';
import { NoticeHeight, screenHeight } from '@utils/Scaling';
import Visuals from './Visuals';
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, useCollapsibleContext, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@views/component/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import  Icon  from 'react-native-vector-icons/Ionicons';


const NOTICE_HEIGHT = -[NoticeHeight + 12];


const ProductDashboard = ()=> {

  const noticePosition = useRef(new RNanimated.Value(NOTICE_HEIGHT)).current;

const {scrollY,expand} = useCollapsibleContext();
const previousScroll = useRef<number>(0);

const backToTopStyle = useAnimatedStyle(()=>{

  const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180;
  const opacity = withTiming(isScrollingUp ? 1 : 0,{duration:300});
  const translateY = withTiming(isScrollingUp ? 0 : 10,{duration:300});
  previousScroll.current = scrollY.value;

  return{
    opacity,
    transform:[{translateY}],
  };
});
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
      {/* scroll to top */}

        <Animated.View style={[styles.backToTopButton,backToTopStyle]}>
          <TouchableOpacity
            onPress={()=>{
              scrollY.value = 0;
              expand();
            }}
            style={{flexDirection:'row',alignItems:'center',gap:6}}
          >
                <Icon name="arrow-up-circle-outline" color={'white'} size={RFValue(12)}/>
                <CustomText variant="h9" style={{color:'white'}} fontFamily={Fonts.Bold}>
                  Back to top
                </CustomText>
          </TouchableOpacity>
        </Animated.View>






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

            <CollapsibleScrollView
              nestedScrollEnabled
              style={styles.panelContainer}
              showsVerticalScrollIndicator={false}
            >
              <Content/>

              <View style={{backgroundColor:'#F8F8F8',padding:20}} >
                <CustomText fontSize={RFValue(32)} fontFamily={Fonts.Bold} style={{opacity:0.2}}>
                  India's last minute app
                </CustomText>
                <CustomText
                fontFamily={Fonts.Bold}
                style={{marginTop:10,paddingBottom:100,opacity:0.2}}>
                  Developed By Varun gandhi
                </CustomText>
              </View>
            </CollapsibleScrollView>
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
  backToTopButton:{
    position:'absolute',
    alignSelf:'center',
    top:Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection:'row',
    alignItems:'center',
    gap:4,
    backgroundColor:'black',
    borderRadius:20,
    paddingHorizontal:10,
    paddingVertical:5,
    zIndex:999,
  },
});
