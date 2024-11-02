// OrderList
import CustomText from '@components/ui/CustomText';
import { RootState } from '@store/store';
import { Colors, Fonts } from '@utils/Constants';
import React from 'react';
import {  Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';

const OrderList = () => {
    const {cart} = useSelector((state: RootState) => state.cart);
    const totalItems = cart.reduce((acc,cart)=>acc + cart?.count,0);

  return (
    <View style={styles.container}>
        <View style={styles.flexRow}>
                <View style={styles.imageContainer}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.img}/>
                </View>
                <View>
                    <CustomText
                        variant="h5"
                        fontFamily={Fonts.SemiBold}
                    >
                            Delivery in 9 minutes
                    </CustomText>

                    <CustomText
                        variant="h5"
                        fontFamily={Fonts.SemiBold}
                        style={{opacity:0.5}}
                    >
                            Shipment of {totalItems || 0}
                    </CustomText>
                </View>
        </View>

        {cart?.map((item)=>{
            return(
                <OrderItem key={item.id} item={item}/>
            );
        })}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius:15,
    marginBottom:15,
  },
  flexRow: {
    alignItems:'center',
    flexDirection:'row',
    gap:12,
    paddingHorizontal:10,
    paddingVertical:12,
  },
  imageContainer:{
    backgroundColor:Colors.backgroundSecondary,
    padding:10,
    borderRadius:15,
  },
  img:{
    height:30,
    width:30,
  },
});

export default OrderList;
