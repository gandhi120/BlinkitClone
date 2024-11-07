// LiveMap
import MapViewComponent from '@components/map/MapViewComponent';
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React, { FC, useEffect, useState } from 'react';
import {  StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import Mapbox from '@rnmapbox/maps';
import { MAP_ACCESS_TOKEN } from '@service/config';

interface LiveMapProps{
  deliveryPersonLocation:any;
  pickupLocation:any;
  deliveryLocation:any;
  hasPickedUp:any;
  hasAccepted:any;
}

const LiveMap:FC<LiveMapProps> = (
  {hasAccepted,pickupLocation,deliveryPersonLocation,hasPickedUp,deliveryLocation}
) => {

  const[mapRef,setMapRef] = useState(null);
  const[cameraRef,setCameraRef] = useState(null);

useEffect(()=>{
  Mapbox.setAccessToken(MAP_ACCESS_TOKEN);
},[]);




  return (
    <View style={styles.container}>
      <MapViewComponent
        setMapRef={(ref:any)=>setMapRef(ref)}
        setCameraRef={(ref:any)=>setCameraRef(ref)}
        hasAccepted={hasAccepted}
        pickupLocation={pickupLocation}
        hasPickedUp={hasPickedUp}
        deliveryPersonLocation={deliveryPersonLocation}
        deliveryLocation={deliveryLocation}
      />

      <TouchableOpacity style={styles.fitButton} onPress={()=>{
        let location = deliveryPersonLocation;
        cameraRef?.current?.flyTo(
        [location?.latitude,location?.longitude],
        1000 // Duration in ms
         );
      cameraRef?.current?.zoomTo(15); // Set desired zoom level
      }}>
        <Icon name="target" size={RFValue(14)} color={Colors.text}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:screenHeight * 0.35,
    width:'100%',
    borderRadius:15,
    backgroundColor:'#fff',
    overflow:'hidden',
    borderWidth:1,
    borderColor:Colors.border,
    position:'relative',
  },
  fitButton:{
    position:'absolute',
    bottom:10,
    right:10,
    padding:5,
    backgroundColor:'#fff',
    borderWidth:0.8,
    borderColor:Colors.border,
    shadowOffset:{width:1,height:2},
    shadowOpacity:0.2,
    shadowRadius:10,
    shadowColor:'black',
    elevation:5,
    borderRadius:35,
  },
});

export default LiveMap;
