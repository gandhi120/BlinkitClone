import React, { FC, useEffect, useState } from 'react';
import {  FlatList, StyleSheet, View } from 'react-native';
import { logout } from '@store/slice/authSlice';
import { clearCart } from '@store/slice/cartSlice';
import {persistor} from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { fetchCustomerOrder } from '@service/orderService';
import CustomHeader from '@components/ui/CustomHeader';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import WalletSection from './WalletSection';
import ActionButton from './ActionButton';
import OrderItem from './OrderItem';
import { resetAndNavigate } from '@utils/NavigationUtils';
import  { clearAllData } from '@store/mmkvStorage/storage';

const Profile:FC = () => {

    const[orders,setOrders] = useState([]);
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

const fetchOrders = async()=>{
    const data = await fetchCustomerOrder(user?._id);
    setOrders(data);
};

useEffect(()=>{
    fetchOrders();
},[]);

const renderOrders = ({item,index}:any)=>{
    return(
        <OrderItem item={item} index={index}/>
    );
};

const renderHeader = ()=>{
    return(
        <View>
            <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
                    Your Account
            </CustomText>
            <CustomText variant="h7" fontFamily={Fonts.Medium}>
                {user?.phone}
            </CustomText>

            <WalletSection/>

            <CustomText variant="h8" style={styles.informativeText}>
                YOUR INFORMATION
            </CustomText>

            <ActionButton icon="book-outline" label="Address book"/>
            <ActionButton icon="information-circle-outline" label="About us"/>
            <ActionButton icon="book-outline" label="Logout" onPress={()=>{
                dispatch(clearCart());
                dispatch(logout());
                clearAllData();
                if(persistor.purge){
                  persistor.purge();
                }
                resetAndNavigate('CustomerLogin');
            }}/>
            <CustomText variant="h8" style={styles.pastText}>
                PAST ORDERS
            </CustomText>
        </View>
    );
};

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile"/>

      <FlatList
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={(item)=>item?.orderId}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  scrollViewContent:{
    padding:10,
    paddingTop:20,
    paddingBottom:100,
  },
  informativeText:{
    opacity:0.7,
    marginBottom:20,
  },
pastText:{
    marginVertical:20,
    opacity:0.7,
},
});

export default Profile;
