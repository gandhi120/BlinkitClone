import apiClient from './authService';
import { MAP_ACCESS_TOKEN } from '@service/config';
import axios from 'axios';

export const reverseGeocode =
     async (latitude:number,longitude:number,setUser:any,dispatch:any) => {
    try {
    const response:any = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=${MAP_ACCESS_TOKEN}`);
    const res = JSON.parse(response.request._response);

      if(res?.features[0]?.place_name){
        const address = res?.features[0]?.place_name;
        updateUserLocation({liveLocation:{latitude,longitude},address},setUser,dispatch);
      }else{
        console.log('reverseGeocode ERROR',error);
      }
      return response?.features[0]?.place_name;
    } catch (error) {
      return null;
    }
  };


export const updateUserLocation =  async (data:any,setUser:any,dispatch:any) => {
    try {
      const response = await apiClient.patch('/user',data);
      dispatch(setUser(response?.data?.user));
    } catch (error) {
      console.log('sendLiveOrderUpdates ERROR',error);
      return null;
    }
  };
