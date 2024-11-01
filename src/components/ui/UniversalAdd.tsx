import React, { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import{addItem,getItemCount,removeItem} from '@store/slice/cartSlice';



const UniversalAdd:FC<{item:any}> = ({item}) => {
    const dispatch = useDispatch();
    const {cart} = useSelector((state: RootState) => state.cart);
    const count = getItemCount(cart,item._id);

  return (
    <View style={[styles.container,{backgroundColor:count === 0 ? '#fff' : Colors.secondary}]}>
      {count === 0 ?
        <Pressable onPress={()=>dispatch(addItem(item))} style={styles.add}>
            <CustomText variant="h9" fontFamily={Fonts.SemiBold} style={styles.addText}>ADD</CustomText>
        </Pressable> :

         <View style={styles.counterContainer}>
            <Pressable onPress={()=>dispatch(removeItem(item?._id))}>
                <Icon name="minus" color={'#fff'} size={RFValue(13)}/>
            </Pressable>
            <CustomText variant="h8" style={styles.text} fontFamily={Fonts.SemiBold}>
                    {count}
            </CustomText>

            <Pressable onPress={()=>dispatch(addItem(item))}>
                <Icon name="plus" color={'#fff'} size={RFValue(13)}/>
            </Pressable>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:Colors.secondary,
    width:65,
    borderRadius:8,
  },
  add: {
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:4,
    paddingVertical:6,
  },
  addText:{
    color:Colors.secondary,
  },
  counterContainer:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    paddingHorizontal:4,
    paddingVertical:6,
    justifyContent:'space-between',
  },
  text:{
    color:'#fff',
  },
});

export default UniversalAdd;
