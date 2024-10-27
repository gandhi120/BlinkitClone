import { StyleSheet } from 'react-native';
import { screenHeight } from '@utils/Scaling';

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    padding:20,
  },
  lottie:{
    height:'100%',
    width:'100%',
  },
  lottieContainer:{
    height:screenHeight * 0.12,
    width:'100%',
  },
  text:{
    marginTop:2,
    marginBottom:25,
    opacity:0.8,
  },
});

export default styles;
