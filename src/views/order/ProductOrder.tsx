import CustomHeader from '@components/ui/CustomHeader';
import { Colors, Fonts } from '@utils/Constants';
import React, { useState } from 'react';
import {  Alert, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import OrderList from './OrderList';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { clearCart, getTotalPriceCount } from '@store/slice/cartSlice';
import { setCurrentOrder } from '@store/slice/authSlice';
import BillDetails from './BillDetails';
import { hocStyles } from '@styles/globalStyles';
import ArrowButton from '@components/ui/ArrowButton';
import { navigate } from '@utils/NavigationUtils';
import { createOrder } from '@service/orderService';

const ProductOrder = () => {
  const dispatch = useDispatch();

  const {cart} = useSelector((state: RootState) => state.cart);
  const {user,currentOrder} = useSelector((state: RootState) => state.auth);

  const totalPrice = getTotalPriceCount(cart);
const [loading,setLoading] = useState(false);

const handlePlaceOrder = async()=>{
  if(currentOrder !== null && currentOrder !== undefined){
    Alert.alert('Let your First order to be delivered');
    return;
  }

  const formateData = cart.map(item=>({
    id:item._id,
    item:item._id,
    count:item.count,
  }));

  if(formateData.length === 0){
    Alert.alert('Add any items to place order');
    return;
  }
  setLoading(true);

  const data = await createOrder(formateData,totalPrice);

  if(data !== null){
    dispatch(setCurrentOrder(data));
    dispatch(clearCart());
    navigate('OrderSuccess',{...data});
  }else{
    Alert.alert('There was an error');
  }
  setLoading(false);
};



  return (
    <View style={styles.container}>
        <CustomHeader title="Checkout"/>
      <ScrollView contentContainerStyle={styles.scrollContainer} >
        <OrderList/>

        <View style={styles.flexRowBetween}>
            <View style={styles.flexRow}>
                <Image source={require('@assets/icons/coupon.png')} style={{width:25,height:25}}/>
                <CustomText variant="h6" fontFamily={Fonts.SemiBold}>Use Coupons</CustomText>
            </View>
            <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>
          <BillDetails totalItemPrice={totalPrice}/>

          <View style={styles.flexRowBetween}>
            <View>
                <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
                  Cancellation Policy
                </CustomText>
                <CustomText variant="h9" style={styles.cancelText} fontFamily={Fonts.SemiBold}>
                  Orders cannot be cancelled once packed for delivery, In case of unexpected delays a,
                  refund will be provided, if applicable
                </CustomText>
            </View>
          </View>
      </ScrollView>

        <View style={hocStyles.cartContainer}>
            <View style={styles.absoluteContainer}>
              <View style={styles.addressContainer}>
                  <View style={styles.flexRow} >
                    <Image source={require('@assets/icons/home.png')} style={{width:20,height:20}}/>
                    <View style={{width:'75%'}}>
                        <CustomText variant="h8" fontFamily={Fonts.Medium}>Delivering to Home</CustomText>
                        <CustomText variant="h9" numberOfLines={2} style={{opacity:0.6}}>{user?.address}</CustomText>
                    </View>
                  </View>

                  <TouchableOpacity>
                    <CustomText variant="h8" style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>Change</CustomText>
                  </TouchableOpacity>
              </View>


                  <View style={styles.paymentGateway} >
                        <View style={{width:'30%'}}>
                          <CustomText fontFamily={Fonts.Regular} fontSize={RFValue(6)}>💵 PAY USING</CustomText>
                          <CustomText fontFamily={Fonts.Regular} variant="h9" style={{marginTop:2}} >Cash on Delivery</CustomText>
                        </View>

                        <View style={{width:'70%'}}>
                            <ArrowButton
                              loading={loading}
                              price={totalPrice}
                              title="Place Order"
                              onPress={async()=>{
                                    await handlePlaceOrder();
                              }}
                            />
                        </View>
                  </View>
              </View>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  scrollContainer: {
    padding:10,
    paddingBottom:250,
    backgroundColor: Colors.backgroundSecondary,

  },
  flexRowBetween:{
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10,
    borderRadius:15,
    flexDirection:'row',
  },
  flexRow:{
    alignItems:'center',
    flexDirection:'row',
    gap:10,
  },
  cancelText:{
    marginTop:4,
    opacity:0.6,
  },
  absoluteContainer:{
    marginVertical:15,
    marginBottom:Platform.OS === 'ios' ? 30 : 10,
  },
  addressContainer:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:10,
    paddingBottom:10,
    borderBottomWidth:0.7,
    borderColor:Colors.border,
  },
  paymentGateway:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:14,
  },
});

export default ProductOrder;
