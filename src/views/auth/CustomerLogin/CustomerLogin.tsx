import React, { FC, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import {GestureHandlerRootView, PanGestureHandler, State} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@views/component/CustomSafeAreaView';
import ProductSlider from '@views/component/login/ProductSlider/productSlider';
import styles from './styles';
import { resetAndNavigate } from '@utils/NavigationUtils';

const CustomerLogin:FC = ()=> {

  const[gestureSequence,setGestureSequence] = useState<string[]>([]);

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
          >
            <View style={styles.content}>
              <Image source={require('@assets/images/logo.png')} style={styles.logo}/>
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
        </CustomSafeAreaView>
      </View>
      </GestureHandlerRootView>
    );
};

export default CustomerLogin;
