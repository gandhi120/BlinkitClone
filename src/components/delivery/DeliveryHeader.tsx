import React, { FC } from 'react';
import {  Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { logout } from '@store/slice/authSlice';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { resetAndNavigate } from '@utils/NavigationUtils';
import  { clearAllData } from '@store/mmkvStorage/storage';


const DeliveryHeader:FC<{name:string;email:string}> = ({name,email}) => {


  return (
    <View style={styles.flexRow}>
      <View style={styles.imageContainer}>
            <Image source={require('@assets/images/delivery_boy.png')} style={styles.img}/>
      </View>
      <View style={styles.infoContainer}>
            <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
                Hello {name}!
            </CustomText>
            <CustomText numberOfLines={1} variant="h8" fontFamily={Fonts.Medium}>
                {email}
            </CustomText>
      </View>

      <TouchableOpacity onPress={()=>{
        resetAndNavigate('CustomerLogin');
        clearAllData();
        logout();
      }}>
        <Icon name="logout" size={30} color={'black'}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    padding:10,
  },
  imageContainer: {
    padding:4,
    borderRadius:100,
    height:60,
    width:60,
    overflow:'hidden',
    backgroundColor:Colors.backgroundSecondary,
  },
  img:{
    width:'100%',
    bottom:-8,
    height:'100%',
    resizeMode:'contain',
  },
  infoContainer:{
    width:'70%',
  },
});

export default DeliveryHeader;
