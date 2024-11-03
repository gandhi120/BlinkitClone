import { RootState } from '@store/store';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartAnimationWrapper from './CartAnimationWrapper';
import CartSummary from './CartSummary';
import { setCurrentOrder } from '@store/slice/authSlice';
import { useNavigationState } from '@react-navigation/native';
import { getOrderById } from '@service/orderService';
import { hocStyles } from '@styles/globalStyles';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';



const withLiveStatus = <P extends object>(WrappedComponent:React.ComponentType<P>):FC<P>=>{

    const WithLiveComponent:FC<P> = (props)=>{

        const dispatch = useDispatch();

    const {currentOrder} = useSelector((state: RootState) => state.auth);
    const routeName = useNavigationState(state=>state.routes[state.index]?.name);

    const fetchOrderDetails = async()=>{
        const data = await getOrderById(currentOrder?._id as any);
        dispatch(setCurrentOrder(data));
    };

            return(
                <View style={styles.container}>
                    <WrappedComponent {...props}/>

                    {currentOrder && routeName === 'ProductDashboard' && (
                        <View style={[hocStyles.cartContainer,{flexDirection:'row',alignItems:'center'}]}>
                            <View style={styles.flexRow}>

                                <View style={styles.img}>
                                    <Image source={require('@assets/icons/bucket.png')} style={{width:20,height:20 }}/>
                                </View>

                                <View style={{width:'68%'}}>
                                    <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                                        Order is {currentOrder?.status}
                                    </CustomText>
                                    <CustomText variant="h9" fontFamily={Fonts.Medium}>
                                        {currentOrder?.items![0]?.item.name +
                                         (currentOrder?.item?.length - 1 > 0 ? `and ${(currentOrder?.items?.length - 1)}+ items`
                                         : '')}
                                    </CustomText>
                                </View>
                                <TouchableOpacity onPress={()=>navigate('LiveTracking')} style={styles.btn}>
                                <CustomText variant="h8" style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>
                                    View
                                </CustomText>
                            </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            );
    };
return WithLiveComponent;
};



const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        borderRadius:15,
        marginBottom:30,
        paddingVertical:10,
        padding:10,
    },
    img:{
        backgroundColor:Colors.backgroundSecondary,
        borderRadius:100,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        paddingHorizontal:10,
        paddingVertical:2,
        borderWidth:0.7,
        borderColor:Colors.secondary,
        borderRadius:5,
    },
});

export default withLiveStatus;
