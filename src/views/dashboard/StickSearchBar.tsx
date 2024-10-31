import { StickyView, useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import { Colors } from '@utils/Constants';
import React, { FC } from 'react';
import {  StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import SearchBar from '../component/dashboard/SearchBar';

const StickSearchBar:FC = () => {
const{scrollY} = useCollapsibleContext();

const animatedShadow = useAnimatedStyle(()=>{
    const opacity = interpolate(scrollY.value,[0,140],[0,1]);
    return{opacity};
});

const backGroundColorChanges = useAnimatedStyle(()=>{
    const opacity = interpolate(scrollY.value,[1,80],[0,1]);
    return{backgroundColor:`rgba(255,255,255,${opacity})`};
});
  return (
    <StickyView style={[backGroundColorChanges]}>
      <SearchBar/>
      <Animated.View style={[styles.shadow,animatedShadow]}/>
    </StickyView>
  );
};

const styles = StyleSheet.create({
  shadow: {
   height:15,
   width:'100%',
   borderBottomWidth:1,
   borderBottomColor:Colors.border,
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default StickSearchBar;
