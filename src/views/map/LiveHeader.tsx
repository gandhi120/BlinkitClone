// LiveHeader
import CustomText from '@components/ui/CustomText';
import { setCurrentOrder } from '@store/slice/authSlice';
import { RootState } from '@store/store';
import { Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import {  Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

const LiveHeader:FC<{type:'Customer'|'Delivery';title:string;secondTitle:string}> = ({
    title,secondTitle,type,
}) => {
const dispatch = useDispatch();
const isCustomer = type === 'Customer';
const {currentOrder} = useSelector((state: RootState) => state.auth);


  return (
    <SafeAreaView >
        <View style={styles.headerContainer}>
                <Pressable style={styles.backButton} onPress={()=>{
                    if(isCustomer){
                        navigate('ProductDashboard');
                        if(currentOrder?.status === 'delivered'){
                          dispatch(setCurrentOrder(null));
                        }
                        return;
                    }
                    navigate('DeliveryDashboard');
                }}>
                    <Icon
                        name="chevron-back"
                        color={isCustomer ? '#fff' : '#000'}
                        size={RFValue(16)}
                        />
                </Pressable>
                <CustomText variant="h8"
                    fontFamily={Fonts.Medium}
                    style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}>
                    { title}
                </CustomText>
                <CustomText
                    variant="h4"
                    fontFamily={Fonts.SemiBold}
                    style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
                >
                    { secondTitle}
                </CustomText>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    paddingVertical:10,
    alignItems:'center',
  },
  backButton: {
    position:'absolute',
    left:20,
  },
  titleTextBlack:{
    color:'black',
  },
  titleTextWhite:{
    color:'white',
  },
});

export default LiveHeader;
