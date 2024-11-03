import React, { FC, useEffect } from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import { setCurrentOrder } from '@store/slice/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { getOrderById } from '@service/orderService';
import { Colors, Fonts } from '@utils/Constants';
import LiveHeader from './LiveHeader';
import LiveMap from './LiveMap';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';
import withLiveStatus from './WithLiveStatus';


const LiveTracking:FC = () => {
    const dispatch = useDispatch();

    const {currentOrder} = useSelector((state: RootState) => state.auth);

    const fetchOrderDetails = async()=>{
        const data = await getOrderById(currentOrder?._id as any);
        dispatch(setCurrentOrder(data));
    };

    useEffect(()=>{
        fetchOrderDetails();
    },[]);

    let msg = 'Packing your order';
    let time = 'Arriving in 10 minutes';

    if(currentOrder?.status === 'confirmed'){
        msg = 'Arriving Soon';
        time = 'Arriving in 8 minutes';
    }else if(currentOrder?.status === 'arriving'){
        msg = 'Order Picked Up';
        time = 'Arriving in 6 minutes';
    }else if(currentOrder?.status === 'delivered'){
        msg = 'Order Delivered';
        time = 'Fastest Delivery 🌈';
    }

    console.log('cu',currentOrder);


  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} secondTitle={time}/>
      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
                <LiveMap/>

                <View style={styles.flexRow}>
                         <View style={styles.iconContainer}>
                              <Icon
                               name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'}
                              color={Colors.disabled}
                              size={RFValue(20)}
                            />
                          </View>


                          <View style={{width:'82%'}}>

                                  <CustomText numberOfLines={1} variant="h7" fontFamily={Fonts.SemiBold}>
                                      {currentOrder?.deliveryPartner?.name || 'We will soon assign delivery partner'}
                                  </CustomText>

                              {currentOrder?.deliveryPartner &&
                                  <CustomText variant="h7" fontFamily={Fonts.Medium}>
                                      {currentOrder?.deliveryPartner?.phone}
                                  </CustomText>
                              }

                                  <CustomText variant="h9" fontFamily={Fonts.Medium}>
                                      {currentOrder?.deliveryPartner ?
                                      'For Delivery instructions you can contact here' :
                                      msg}
                                  </CustomText>

                          </View>

                </View>
                <DeliveryDetails details={currentOrder?.customer}/>
                <OrderSummary order={currentOrder}/>
                <CustomText
                    variant="h6"
                    fontFamily={Fonts.SemiBold}
                    style={{opacity:0.6,marginTop:20}}>
                      Varun Gandhi x Blinkit
                </CustomText>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent:{
    paddingBottom:150,
    backgroundColor:Colors.backgroundSecondary,
    padding:15,
  },
  flexRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    width:'100%',
    borderRadius:15,
    marginTop:15,
    paddingVertical:10,
    backgroundColor:'#fff',
    padding:10,
    borderBottomWidth:0.7,
    borderColor:Colors.border,
  },
  iconContainer:{
    backgroundColor:Colors.backgroundSecondary,
    borderRadius:100,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
  },
});

export default withLiveStatus(LiveTracking);
