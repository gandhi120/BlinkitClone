// DeliveryMap
import React, { FC, useEffect, useState } from 'react';
import {  Alert, ScrollView, StyleSheet, View } from 'react-native';
import { setCurrentOrder } from '@store/slice/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { confirmOrder, getOrderById, sendLiveOrderUpdates } from '@service/orderService';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import LiveHeader from '@views/map/LiveHeader';
import LiveMap from '@views/map/LiveMap';
import DeliveryDetails from '@views/map/DeliveryDetails';
import OrderSummary from '@views/map/OrderSummary';
import CustomButton from '@components/ui/CustomButton';
import { hocStyles } from '@styles/globalStyles';


const DeliveryMap:FC = () => {
    const {user} = useSelector((state: RootState) => state.auth);
    const [orderData,setOrderData] = useState<any>(null);
    const [myLocation,setMyLocation] = useState<any>(null);
    const route = useRoute();

    const orderDetails = route?.params as Record<string,any>;

    const fetchOrderDetails = async()=>{
        const data = await getOrderById(orderDetails?._id as any);
        setOrderData(data);
        // dispatch(setCurrentOrder(data));
    };

    useEffect(()=>{
        fetchOrderDetails();
    },[]);

    useEffect(()=>{
        const watchId = Geolocation.watchPosition(
            async(position)=>{
                const {latitude,longitude} = position.coords;
                setMyLocation({latitude,longitude});
            },
            (err)=>{
                console.log('ERROR FETCHING GEO_LOCATION',err);
            },
            {enableHighAccuracy:true,distanceFilter:2}
        );
        return()=>Geolocation.clearWatch(watchId);
    },[]);

    const acceptOrder = async()=>{
        const data = await confirmOrder(orderData?._id,myLocation);
        if(data){
            setCurrentOrder(data);
            Alert.alert('Order Accepted, Grab your package');
        }else{
            Alert.alert('There was an error');
        }
        fetchOrderDetails();
    };


    const orderPickedUp = async()=>{
        const data = await sendLiveOrderUpdates(orderData?._id,myLocation,'arriving');
        if(data){
            setCurrentOrder(data);
            Alert.alert('Order Accepted, Grab your package');
        }else{
            Alert.alert('There was an error');
        }
        fetchOrderDetails();
    };

    const orderDelivered = async()=>{
        const data = await sendLiveOrderUpdates(orderData?._id,myLocation,'delivered');
        if(data){
            setCurrentOrder(data);
            Alert.alert('Order Accepted, Grab your package');
        }else{
            Alert.alert('There was an error');
        }
        fetchOrderDetails();
    };



    let message = 'Start this order';
    if(orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'confirmed'){
        message = 'Grab your order';
    }else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'arriving'){
        message = 'Complete your order';
    }else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'delivered'){
        message = 'Your milestone';
    }else if(orderData?.deliveryPartner?._id == user?._id && orderData?.status === 'available'){
        message = 'You missed it!';
    }

    useEffect(()=>{
        async function sendLiveUpdates() {
            if(orderData?.deliveryPartner?._id == user?._id &&
                orderData?.status !== 'delivered' &&
                orderData?.status !== 'cancelled'
            ){
                await sendLiveOrderUpdates(orderData._id,myLocation,orderData?.status);
                fetchOrderDetails();
            }
        }
    },[myLocation]);


  return (
    <View style={styles.container}>
      <LiveHeader type="Delivery" title={message} secondTitle={'Delivery in 10 minutes'}/>
      <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <LiveMap/>

            <DeliveryDetails details={orderData?.customer}/>
            <OrderSummary order={orderData}/>

                <CustomText
                    variant="h6"
                    fontFamily={Fonts.SemiBold}
                    style={{opacity:0.6,marginTop:20}}>
                      Varun Gandhi x Blinkit
                </CustomText>

      </ScrollView>

       {orderData?.status !== 'delivered' &&
                orderData?.status !== 'cancelled' &&
                <View style={[hocStyles.cartContainer,styles.buttonContainer]}>
                    {orderData?.status === 'available' &&
                        <CustomButton
                            disabled={false}
                            title="Accept Order"
                            onPress={acceptOrder}
                            loading={false}
                        />
                    }

                    {orderData?.status === 'confirmed' &&
                    orderData?.deliveryPartner?._id === user?._id &&
                        <CustomButton
                            disabled={false}
                            title="Order Picked Up"
                            onPress={orderPickedUp}
                            loading={false}
                        />
                    }

                    {orderData?.status === 'arriving' &&
                    orderData?.deliveryPartner?._id === user?._id &&
                        <CustomButton
                            disabled={false}
                            title="Delivered"
                            onPress={orderDelivered}
                            loading={false}
                        />
                    }
                </View>
                }



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
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
  buttonContainer:{
    padding:10,
  },
});

export default DeliveryMap;
