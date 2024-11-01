import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Barometer from 'react-native-barometer';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';


const Altitude = () => {
  const [initialAltitude, setInitialAltitude] = useState(null);
  const [currentPressure, setCurrentPressure] = useState(null);
  const [calculatedHeight, setCalculatedHeight] = useState(null);

  // Constants for sea-level pressure and height calculation factor
  const SEA_LEVEL_PRESSURE = 1013.25; // hPa at sea level
  const PRESSURE_HEIGHT_FACTOR = 8.3; // Approximate height change per hPa

//   Request location permissions and fetch GPS altitude
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Permission',
            message: 'We need access to your location to determine altitude.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }else{
        if (Platform.OS === 'ios') {
          console.log('PERMISSIONS',PERMISSIONS);

            const result = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
            if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
              return await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            }
            return result === RESULTS.GRANTED;
          }
          return false;
      }
    };

    const getGPSAltitude = async () => {
      const hasPermission = await requestLocationPermission();
      console.log('hasPermission',hasPermission);

      if (!hasPermission) {return;}

      Geolocation.getCurrentPosition(
        (position) => {
            console.log('position',position);

          const { altitude } = position.coords;
          setInitialAltitude(altitude); // Set initial altitude
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    getGPSAltitude();
  }, []);

//   Barometer listener for pressure changes
//   useEffect(() => {
//     // Barometer.start();
//     // Barometer.setListener((data) => {
//     //   setCurrentPressure(data.pressure); // Set the latest pressure reading

//     //   if (initialAltitude !== null) {
//     //     // Calculate height above initial altitude
//     //     const heightFromPressure = (SEA_LEVEL_PRESSURE - data.pressure) * PRESSURE_HEIGHT_FACTOR;
//     //     const adjustedHeight = initialAltitude + heightFromPressure;
//     //     setCalculatedHeight(adjustedHeight.toFixed(2));
//     //   }
//     // });

//     // return () => Barometer.stop(); // Clean up the barometer listener
//   }, [initialAltitude]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Initial GPS Altitude: {initialAltitude ? `${initialAltitude.toFixed(2)} meters` : 'Loading...'}</Text>
      <Text>Current Pressure: {currentPressure ? `${currentPressure.toFixed(2)} hPa` : 'Loading...'}</Text>
      <Text>Estimated Height Above Sea Level: {calculatedHeight ? `${calculatedHeight} meters` : 'Calculating...'}</Text>
    </View>
  );
};

export default Altitude;

