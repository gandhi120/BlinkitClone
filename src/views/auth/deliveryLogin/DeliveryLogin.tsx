import { deliveryLogin } from '@store/slice/authSlice';
import { resetAndNavigate } from '@utils/NavigationUtils';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const DeliveryLogin = ()=> {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const handleLogin = async()=>{
    setLoading(true);
    try {
      deliveryLogin({email,password});
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    }finally{
      setLoading(true);
    }
  };
    return (
      <View>
        <Text> DeliveryLogin </Text>
      </View>
    );
};
export default DeliveryLogin;
