import 'react-native-gesture-handler';
import Navigation from '@navigation/Navigation';
import { Provider, useDispatch } from 'react-redux';
import {persistor,store} from '@store/store';
import { PersistGate } from 'redux-persist/integration/react';
import GeoLocation from '@react-native-community/geolocation';
import { Alert } from 'react-native';
import reduxStorage from '@store/mmkvStorage/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { jwtDecode } from 'jwt-decode';
import { refetchToken, reFetchUser } from '@store/slice/authSlice';
import React, { FC, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';





GeoLocation.setRNConfiguration({
  skipPermissionRequests:false,
  authorizationLevel:'always',
  enableBackgroundLocationUpdates:true,
  locationProvider:'auto',
});
interface DecodedToken{
  exp:number;
}


const AppWrapper = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(someAction());
  // }, [dispatch]);


  // const dispatch = store.dispatch;
  const dispatch = useDispatch();



  const {user} = store.getState()?.auth;
  useEffect(()=>{
    const fetchUserLocation = async()=>{
      try {
        tokenCheck();
      } catch (error) {
        Alert.alert('Sorry we need location service to give you better shopping experience');
      }
    };
setTimeout(() => {
  GeoLocation.requestAuthorization();
  SplashScreen.hide();
}, 3000);

    fetchUserLocation();
    return()=>{};
    // return()=>clearTimeout(timeOutId);
  });

  const tokenCheck = async()=>{
    const accessToken = await reduxStorage.getItem('accessToken');
    const refreshToken = await reduxStorage.getItem('refreshToken');

    if(accessToken){
        const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
        const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
        const currentTime = Date.now() / 1000;

        if(decodedRefreshToken.exp < currentTime){
          resetAndNavigate('CustomerLogin');
          Alert.alert('Session expired ,Please Login again');
          return false;
        }

        if(decodedAccessToken.exp < currentTime){
          try {
            // store.dispatch(refetchToken());
            // store.dispatch(reFetchUser());

            dispatch(refetchToken());
            dispatch(reFetchUser());
            // refetchUser();
          } catch (error) {
            console.log('error',error);
            Alert.alert('There was an erroring refreshing token');
            return false;
          }
        }
        console.log('user?.role',user?.role);

        if(user?.role === 'Customer'){
          resetAndNavigate('ProductDashboard');
        }else if(user?.role === 'DeliveryPartner'){
          resetAndNavigate('DeliveryDashboard');
        }else{
          resetAndNavigate('CustomerLogin');
        }
        return false;
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };


  return <Navigation/>;
};







const App:FC = ()=>{
  return(
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>
      <AppWrapper/>
      </PersistGate>
    </Provider>
  );
};

export default App;
