
import ScalePress from '@components/ui/ScalePress';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
// import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const AdCarousal:FC<{addData:any}> = ({adData}) => {

// const progressValue = useSharedValue(0);
const baseOption = {
    vertical:false,
    width:screenWidth,
    height:screenHeight / 4,
};
  return (
    <View style={{left:-20,marginVertical:20}}>
      <Carousel
      {...baseOption}
      loop
      pagingEnabled
      snapEnabled
      autoPlay
      autoPlayInterval={3000}
      mode="parallax"
      data={adData}
      modeConfig={{
        parallaxScrollingOffset:0,
        parallaxScrollingScale:0.94,
      }}
      renderItem={({item}:any)=>{
        return(
            <ScalePress style={styles.imageContainer}>
                <Image
                source={item}
                style={styles.img}
                />
            </ScalePress>
        );
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer:{
    width:'100%',
    height:'100%',
  },
  img:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    borderRadius:20,
  },
});

export default AdCarousal;
