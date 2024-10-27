import reduxStorage from '@store/mmkvStorage/storage';
import { BASE_URL } from './config';
import axios from 'axios';
import { store } from '@store/store';
import { refetchToken } from '@store/slice/authSlice';
import { Alert } from 'react-native';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use(async config=>{
    const accessToken = await reduxStorage.getItem('accessToken');
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });


  apiClient.interceptors.response.use(
    response=>response,
    async error=>{
      if(error.response && error.response.status === 401){
        try {
            const newAccessToken = store.dispatch(refetchToken);
              if(newAccessToken){
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(error.config);
              }
        } catch (error) {
          console.log('ERROE REFRESHING TOKEN',error);
        }
      }
      if(error.response && error.response.status !== 401){
        const errorMessage = error.response.data.message || 'something went wrong';
        Alert.alert(errorMessage);
      }
      return Promise.resolve(error);
    }
  );
export default apiClient;
