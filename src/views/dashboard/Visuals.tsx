import { Image, StyleSheet} from 'react-native';
import React, { FC } from 'react';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { darkWeatherColors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import LottieView from 'lottie-react-native';

const Visuals :FC = ()=>{



    return(
        <Animated.View style={[styles.container]}>
            <LinearGradient colors={darkWeatherColors} style={styles.gradient}/>
            <Image source={require('@assets/images/cloud.png')} style={styles.cloud}/>
            <LottieView
            autoPlay={true}
            enableMergePathsAndroidForKitKatAndAbove={true}
            loop={true}
            style={styles.lottie}
            source={require('@assets/animations/raining.json')}
            />
        </Animated.View>
    );
};
export default Visuals;

const styles = StyleSheet.create({
    container:{
        position:'absolute',
    },
    lottie:{
        width:'100%',
        height:150,
        position:'absolute',
        transform:[{translateX:-1}],
    },
    gradient:{
        width:'100%',
        height:screenHeight * 0.4,
        position:'absolute',
    },
    cloud:{
        width:screenWidth,
        resizeMode:'stretch',
        height:100,
    },
});
