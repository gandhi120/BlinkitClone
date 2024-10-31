
import React, { FC, useState } from 'react';
import { Animated, Button, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ScalePressProps{
    onPress?:()=>void;
    children:React.ReactNode;
    style?:ViewStyle
}

const ScalePress:FC<ScalePressProps> = ({onPress,children,style}) => {
    const scaleValue = new Animated.Value(1);

    const onPressIn = ()=>{
        Animated.spring(scaleValue,{
            toValue:0.92,
            useNativeDriver:true,
        }).start();
    };


    const onPressOut = ()=>{
        Animated.spring(scaleValue,{
            toValue:1,
            useNativeDriver:true,
        }).start();
    };


  return (
    <TouchableOpacity
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    onPress={onPress}
    activeOpacity={1}
    style={{...style}}
    >
      <Animated.View style={[{transform:[{scale:scaleValue}],width:'100%'}]} >
        {children}
      </Animated.View>
    </TouchableOpacity>
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

export default ScalePress;
