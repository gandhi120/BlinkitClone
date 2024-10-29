import { StyleSheet } from 'react-native';
// import { screenWidth } from '@utils/Scaling';

const styles = StyleSheet.create({
   noticeContainer:{
    width:'100%',
    zIndex:999,
    position:'absolute',
   },
   contentContainer:{
    flex:1,
    width:'100%',
   },
   container:{
    flex:1,
    backgroundColor:'#fff',
   },
});

export default styles;
