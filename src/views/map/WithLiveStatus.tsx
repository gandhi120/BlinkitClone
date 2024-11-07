import { RootState } from '@store/store';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrder } from '@store/slice/authSlice';
import { useNavigationState } from '@react-navigation/native';
import { getAllOrdersByUserId, getOrderById } from '@service/orderService';
import { hocStyles } from '@styles/globalStyles';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { navigate, resetAndNavigate } from '@utils/NavigationUtils';
import  io  from 'socket.io-client';
import { SOCKET_URL } from '@service/config';



const withLiveStatus = <P extends object>(WrappedComponent:React.ComponentType<P>):FC<P>=>{

    const WithLiveComponent:FC<P> = (props)=>{
        const [loading, setLoading] = useState(false);
        const {user,currentOrder} = useSelector((state: RootState) => state.auth);
        const routeName = useNavigationState(state=>state.routes[state.index]?.name);

        useEffect(()=>{
            // if(routeName === 'DeliveryDashboard'){
                setLoading(true);
                getAllData();
            // }
        },[]);

        const getAllData = async()=>{
            if(user?._id){
                    const data = await getAllOrdersByUserId(routeName,user?._id,user?.branch);
                    dispatch(setCurrentOrder(data[0]));
                    setLoading(false);
            }else{
                setLoading(false);
            }

        };

        const dispatch = useDispatch();



    const fetchOrderDetails = async()=>{
        const data = await getOrderById(currentOrder?._id as any);
        console.log('data',data);

        dispatch(setCurrentOrder(data));
    };


    useEffect(()=>{
        if(currentOrder){
            const socketInstance = io(SOCKET_URL,{
                transports:['websocket'],
                withCredentials:false,
            });
            socketInstance.emit('joinRoom',currentOrder?._id);

            socketInstance.on('liveTrackingUpdates',(updateOrder)=>{
                console.log('liveTrackingUpdates',updateOrder);
                if(updateOrder.status === 'delivered'){
                    dispatch(setCurrentOrder(null));
                    resetAndNavigate('ProductDashboard');
                }else{
                    fetchOrderDetails();
                }
                console.log('RECEIVING LIVE UPDATES');
            });

            socketInstance.on('orderConfirmed',(confirmOrder)=>{
                console.log('orderConfirmed');
                fetchOrderDetails();
                console.log('ORDER CONFIRMATION LIVE UPDATES');
            });

            return ()=>{
                socketInstance.disconnect();
            };
        }
    },[currentOrder]);

    const handleOnView = ()=>{
            navigate('LiveTracking');
    };

if (loading) {return <View style={styles.loading}><ActivityIndicator color={'green'} size={'large'} style={{alignSelf:'center'}}/></View>;}

            return(
                <View style={styles.container}>
                    <WrappedComponent {...props}/>

                    {currentOrder && currentOrder !== null && (routeName === 'ProductDashboard' || routeName === 'ProductCategories') && (
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
                                <TouchableOpacity onPress={()=>handleOnView()} style={styles.btn}>
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
    loading:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
});

export default withLiveStatus;
