import React, { FC } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '@features/auth/SplashScreen';
import { navigationRef } from '@utils/NavigationUtils';
import CustomerLogin from '@views/auth/CustomerLogin/CustomerLogin';
import DeliveryLogin from '@views/auth/deliveryLogin/DeliveryLogin';
import ProductDashboard from '@views/dashboard/ProductDashboard';
import DeliveryDashboard from '@views/dashboard/deliveryDashboard/DeliveryDashboard';
import ProductCategories from '@views/category/ProductCategories';
// import Altitude from '@views/Altitude';
const Stack = createNativeStackNavigator();
const Navigation:FC = () =>{
  return(
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown:false,
      }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="ProductDashboard" component={ProductDashboard}/>
        <Stack.Screen name="ProductCategories" component={ProductCategories}/>
        <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard}/>


        <Stack.Screen options={{
          animation:'fade',
        }}
         name="CustomerLogin" component={CustomerLogin}/>
        <Stack.Screen options={{
          animation:'fade',
        }}
        name="DeliveryLogin" component={DeliveryLogin}/>
        {/* <Stack.Screen name="Altitude" component={Altitude}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
