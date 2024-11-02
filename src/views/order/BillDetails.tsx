// BillDetails

import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import  Icon  from 'react-native-vector-icons/MaterialIcons';


const ReportItem:FC<{iconName:string;underLine?:boolean;title:string;price:number}> = (
    {iconName,underLine,title,price})=>{
        return(
            <View style={[styles.flexRowBetween,{marginBottom:10}]}>
                <View style={styles.flexRow}>
                <Icon name={iconName} style={{opacity:0.7}} size={RFValue(12)} color={Colors.text}/>
                <CustomText
                variant="h8"
                style={{textDecorationLine:underLine ? 'underline' : 'none',textDecorationStyle:'dashed'}}
                >{title}</CustomText>
                </View>

                <CustomText variant="h8">
                    ₹{price}
                </CustomText>
            </View>
        );
};

const BillDetails:FC<{totalItemPrice:number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
      <Text>{'BillDetails'}</Text>
      <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomText>


      <View style={styles.billContainer}>
        <ReportItem iconName="article" title="Items total" price={totalItemPrice}/>
        <ReportItem iconName="pedal-bike" title="Delivery charge" price={29}/>
        <ReportItem iconName="shopping-bag" title="Handling charge" price={2}/>
        <ReportItem iconName="cloudy-snowing" title="Surge charge" price={3}/>
      </View>


      <View style={[styles.flexRowBetween,{marginBottom:15}]}>
        <CustomText variant="h7" fontFamily={Fonts.SemiBold} style={styles.text}>Grand Total</CustomText>
        <CustomText  fontFamily={Fonts.SemiBold} style={styles.text}>₹{totalItemPrice + 34}</CustomText>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:15,
    borderRadius:15,
    backgroundColor: '#fff',
  },
  text: {
    marginHorizontal:10,
    marginTop:15,
  },
  billContainer:{
    padding:10,
    paddingBottom:0,
    borderBottomColor:Colors.border,
    borderBottomWidth:0.7,
  },
  flexRowBetween:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
  },
  flexRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:5,
  },
});

export default BillDetails;
