
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import { RootState } from '@store/store';
import { Colors } from '@utils/Constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const DeliveryDashboard = ()=> {

  const {user} = useSelector((state: RootState) => state.auth);

    return (
      <View style={styles.container}>
        <SafeAreaView >
          <DeliveryHeader name={user?.name} email={user?.email}/>
        </SafeAreaView>
        <View style={styles.subContainer}>
        <Text>hello</Text>
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
