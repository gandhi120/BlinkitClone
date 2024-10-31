// CategoryContainer

import CustomText from '@components/ui/CustomText';
import ScalePress from '@components/ui/ScalePress';
import { Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import {  Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

const CategoryContainer:FC<{data:any}> = ({data}) => {

const renderItems = (items:any)=>{
    return (<>{items.map((item: { image: ImageSourcePropType | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; },index: React.Key | null | undefined)=>{
            return(
                <ScalePress onPress={()=>navigate('ProductCategories')} key={index} style={styles.itemCon}>
                    <View style={styles.imageContainer}>
                        <Image source={item.image} style={styles.image}/>
                    </View>
                    <CustomText style={styles.text} variant="h8" fontFamily={Fonts.Medium}>{item.name}</CustomText>
                 </ScalePress>
            );
    })}</>
);
};


  return (
    <View style={styles.container}>
      <View style={styles.row} >{renderItems(data?.slice(0,4))}</View>
      <View style={styles.row} >{renderItems(data?.slice(4))}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   marginVertical:15,
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'baseline',
    marginBottom:25,
  },
  text:{
    textAlign:'center',
  },
  itemCon:{
    width:'22%',
    justifyContent:'center',
    alignItems:'center',
  },
  imageContainer:{
    width:'100%',
    height:90,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    padding:6,
    backgroundColor:'#E5F3F3',
    marginBottom:8,
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'contain',
  },
});

export default CategoryContainer;
