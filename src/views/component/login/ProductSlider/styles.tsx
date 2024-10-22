import { StyleSheet } from "react-native";
import { screenWidth } from '@utils/Scaling';

const styles = StyleSheet.create({
    itemContainer:{
        marginBottom:12,
        marginHorizontal:10,
        width:screenWidth * 0.26,
        height:screenWidth * 0.26,
        backgroundColor:'#e9f7f8',
        justifyContent:'center',
        borderRadius:25,
        alignItems:'center',
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
    },
    autoScroll:{
        position:'absolute',
        zIndex:-2,
    },
    gridContainer:{
        justifyContent:'center',
        overflow:'visible',
        alignItems:'center',
    },
    row:{
        flexDirection:'row',
        marginBottom:10,
    },
});

export default styles