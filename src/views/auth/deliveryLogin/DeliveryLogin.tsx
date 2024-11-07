import { deliveryLogin } from '@store/slice/authSlice';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomSafeAreaView from '@views/component/CustomSafeAreaView';
import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import styles from './styles';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';

import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';
import { useDispatch } from 'react-redux';

const DeliveryLogin = ()=> {
  const dispatch = useDispatch();
  const [email,setEmail] = useState('deliveryPartner@gmail.com');
  const [password,setPassword] = useState('12345678');
  const [loading,setLoading] = useState(false);

  const handleLogin = async()=>{
    setLoading(true);
    try {
      dispatch(deliveryLogin({email,password}));
      setTimeout(() => {
      resetAndNavigate('DeliveryDashboard');
    }, 500);
    } catch (error) {
      Alert.alert('Login Failed');
    }finally{
      setLoading(true);
    }
  };


    return (
      <CustomSafeAreaView>
        <ScrollView keyboardShouldPersistTaps={'handled'} keyboardDismissMode="on-drag">
            <View style={styles.container}>


              <View style={styles.lottieContainer}>
              <LottieView autoPlay loop style={styles.lottie} source={require('@assets/animations/delivery_man.json')}/>
              </View>

              <CustomText variant="h3" fontFamily={Fonts.Bold}>
                Delivery Partner Portal
              </CustomText>

              <CustomText variant="h6" fontFamily={Fonts.Bold} style={styles.text}>
                Faster than Flash
              </CustomText>

              <CustomInput
              onChangeText={(text)=>setEmail(text.trim())}
              value={email}
              left={<Icon
                    name={'mail'}
                    color={'#F8890E'}
                    style={{marginLeft:10}}
                    size={RFValue(18)}/>}
              placeholder="Email"
              inputMode="email"
              right={false}
              />

            <CustomInput
              onChangeText={(text)=>setPassword(text.trim())}
              value={password}
              left={<Icon
                    name={'key-sharp'}
                    color={'#F8890E'}
                    style={{marginLeft:10}}
                    size={RFValue(18)}/>}
              placeholder="Password"
              secureTextEntry
              right={false}
              />

              <CustomButton
              disabled={email.length === 0 || password.length < 8}
              title="Login"
              onPress={handleLogin}
              loading={loading}/>
            </View>
        </ScrollView>
      </CustomSafeAreaView>
    );
};
export default DeliveryLogin;
