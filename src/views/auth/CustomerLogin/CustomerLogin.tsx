import React, { FC } from 'react';
import { View } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@views/component/CustomSafeAreaView';
import ProductSlider from '@views/component/login/ProductSlider/productSlider';
import styles from './styles';

const CustomerLogin:FC = ()=> {
    return (
      <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider/>
        </CustomSafeAreaView>
      </View>
      </GestureHandlerRootView>
    );
};

export default CustomerLogin;