import React, { FC, useEffect, useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MAP_ACCESS_TOKEN } from '@service/config';
import axios from 'axios';



const MapViewComponent:FC = ({
  hasAccepted,
  pickupLocation,
  hasPickedUp,
  deliveryPersonLocation,
  deliveryLocation,
}:any) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

const deliveryPersonLocationCheck = deliveryPersonLocation?.longitude !== null &&
                                    deliveryPersonLocation?.longitude !== undefined &&
                                    deliveryPersonLocation?.latitude !== null &&
                                    deliveryPersonLocation?.latitude !== undefined;

const pickupLocationCheck = pickupLocation?.longitude !== null &&
                            pickupLocation?.longitude !== undefined &&
                             pickupLocation?.latitude !== null &&
                            pickupLocation?.latitude !== undefined;



const deliveryLocationCheck = deliveryLocation?.longitude !== null &&
                              deliveryLocation?.longitude !== undefined &&
                              deliveryLocation?.latitude !== null &&
                              deliveryLocation?.latitude !== undefined;

  useEffect(()=>{

      if (hasAccepted && deliveryPersonLocationCheck) {
        // Determine route from delivery person's location to the appropriate destination
        const origin = hasPickedUp ? pickupLocation : deliveryPersonLocation;
        const destination = hasPickedUp ? deliveryLocation : pickupLocation;
        getRoute(origin, destination);
      }
  },[hasAccepted,hasPickedUp]);

  const getRoute = async (origin:any, destination:any) => {
    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=${MAP_ACCESS_TOKEN}`;
      const response = await axios.get(url);
      const route = response.data.routes[0].geometry.coordinates;
      setRouteCoordinates(route);
    } catch (error) {
      console.error('Error fetching route: ', error);
    }
  };


  return (
    <View style={{flex:1}}>
     <Mapbox.MapView style={styles.map} styleURL={Mapbox.StyleURL.Street}>
     {deliveryPersonLocationCheck &&
        <Mapbox.Camera
          zoomLevel={10}
          centerCoordinate={[
            deliveryPersonLocation?.longitude,
            deliveryPersonLocation?.latitude,
          ]}
          animationMode={'flyTo'}
          animationDuration={2000}
        />}


          {/* Delivery Person Marker */}
          {deliveryPersonLocationCheck &&
            <Mapbox.PointAnnotation
              id="deliveryPerson"
              coordinate={[deliveryPersonLocation.longitude, deliveryPersonLocation.latitude]}
            >
              <View style={styles.deliveryMarker} />
            </Mapbox.PointAnnotation>
          }


            {/* Pickup Location Marker */}
            {pickupLocationCheck &&
              <Mapbox.PointAnnotation
              id="pickupLocation"
              coordinate={[pickupLocation.longitude, pickupLocation.latitude]}
              >
              <View style={styles.pickupMarker} />
              </Mapbox.PointAnnotation>
            }


         {/* Delivery Location Marker */}
         {deliveryLocationCheck &&
             <Mapbox.PointAnnotation
             id="deliveryLocation"
             coordinate={[deliveryLocation?.longitude,deliveryLocation?.latitude]}
            >
             <View style={styles.marker} />
           </Mapbox.PointAnnotation>
         }


{/* Route Line */}
         {routeCoordinates.length > 0 && (
          <Mapbox.ShapeSource
            id="routeSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates,
              },
            }}
          >
            <Mapbox.LineLayer
              id="routeLine"
              style={{
                lineWidth: 4,
                lineJoin: 'round',
                lineColor: '#1E90FF',
              }}
            />
          </Mapbox.ShapeSource>
        )}


      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2,
  },
  deliveryMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 2,
  },
  pickupMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default MapViewComponent;
