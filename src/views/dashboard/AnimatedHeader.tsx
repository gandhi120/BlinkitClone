import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import Header from '@views/component/Header';
import React, { FC, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

const AnimatedHeader:FC<{showNotice:()=>void}> = ({showNotice}) => {

    const{scrollY} = useCollapsibleContext();

    const headerAnimatedStyle = useAnimatedStyle(()=>{
        const opacity = interpolate(
            scrollY.value,
            [0,120],
            [1,0]
        );
        return {opacity};
    });
  return (
    <Animated.View style={headerAnimatedStyle}>
      <Header showNotice={showNotice}/>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AnimatedHeader;
