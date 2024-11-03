
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import OrderItem from '@components/delivery/OrderItem';
import TabBar from '@components/delivery/TabBar';
import CustomText from '@components/ui/CustomText';
import { fetchOrders } from '@service/orderService';
import { RootState } from '@store/store';
import { Colors } from '@utils/Constants';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const DeliveryDashboard = ()=> {

  const {user} = useSelector((state: RootState) => state.auth);
  const[selectedTab,setSelectedTab] =
        useState<'available'|'delivered'>('available');
  const [loading,setLoading] = useState<boolean>(true);
  const [data,setData] = useState<any[]>([]);
  const [refreshing,setRefreshing] = useState<boolean>(false);
  const renderOrderItem = ({item,index}:any)=>{
    return(
      <OrderItem index={index} item={item}/>
    );
  };

  //api calling..
  const fetchData = async()=>{
    setData([]);
    setRefreshing(true);
    setLoading(true);
    const data = await fetchOrders(selectedTab,user?._id,user?.branch);
    setData(data);
    setRefreshing(false);
    setLoading(false);
  };

useEffect(()=>{
  fetchData();
},[selectedTab]);

    return (
      <View style={styles.container}>
        <SafeAreaView >
          <DeliveryHeader name={user?.name} email={user?.email}/>
        </SafeAreaView>
        <View style={styles.subContainer}>
          <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab}/>
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async()=>await fetchData()}
              />
            }
            ListEmptyComponent={()=>{
              if(loading){
                return(
                  <View style={styles.center}>
                    <ActivityIndicator color={Colors.secondary} size={'small'}/>
                    </View>
                );
              }
              return(
                <View style={styles.center}>
                  <CustomText>No Orders found yet!</CustomText>
                </View>
              );
            }}
            renderItem={renderOrderItem}
            keyExtractor={(item)=>item?.orderId}
            contentContainerStyle={styles.flatListContainer}

          />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.primary,
    flex:1,
  },
  subContainer:{
    backgroundColor:Colors.backgroundSecondary,
    flex:1,
    padding:6,
  },
  flatListContainer:{
    padding:2,
  },
  center:{
    flex:1,
    marginTop:60,
    justifyContent:'center',
    alignItems:'center',
  },
});
export default DeliveryDashboard;
