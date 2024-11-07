import { RootState } from '@store/store';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrder } from '@store/slice/authSlice';
import { useNavigationState } from '@react-navigation/native';
import { getAllOrdersByUserId, getOrderById, sendLiveOrderUpdates } from '@service/orderService';
import { hocStyles } from '@styles/globalStyles';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import Geolocation from '@react-native-community/geolocation';



const withLiveOrder = <P extends object>(WrappedComponent:React.ComponentType<P>):FC<P>=>{

    const WithLiveComponent:FC<P> = (props)=>{
        const [loading, setLoading] = useState(false);
        const [myLocation, setMyLocation] = useState(null);
        const {user,currentOrder} = useSelector((state: RootState) => state.auth);
        const routeName = useNavigationState(state=>state.routes[state.index]?.name);
        const dispatch = useDispatch();


        useEffect(()=>{
            // if(routeName === 'DeliveryDashboard'){
                setLoading(true);
                getAllData();
            // }
        },[]);

        const getAllData = async()=>{
            if(user?._id && user?.branch){
                    const data = await getAllOrdersByUserId(routeName,user?._id,user?.branch);
                    dispatch(setCurrentOrder(data[0]));
                    setLoading(false);
            }else{
                setLoading(false);
            }

        };




    const fetchOrderDetails = async()=>{
        const data = await getOrderById(currentOrder?._id as any);
        dispatch(setCurrentOrder(data));
    };


    useEffect(()=>{
        if(currentOrder){
            const watchId = Geolocation.watchPosition(
                async (position)=>{
                    const {latitude,longitude} = position.coords;
                    console.log('LIVE TRACKING','LAT: ',new Date().toLocaleTimeString());
                    setMyLocation({latitude,longitude});
                },
                (error)=> console.log('Error fetching location',error),
                {enableHighAccuracy:true,distanceFilter:2}
            );

            return ()=>{
               Geolocation.clearWatch(watchId);
            };
        }
    },[currentOrder]);

    useEffect(()=>{
        async function sendLiveUpdates() {
            if(currentOrder?.deliveryPartner?._id == user?._id &&
                currentOrder?.status !== 'delivered' &&
                currentOrder?.status !== 'cancelled'
            ){
                await sendLiveOrderUpdates(currentOrder?._id,myLocation,currentOrder?.status);
                fetchOrderDetails();
            }
        }

        if(currentOrder !== null && currentOrder !== undefined){
            sendLiveUpdates();
        }

    },[myLocation]);

    const handleOnView = ()=>{
            navigate('DeliveryMap',{...currentOrder});
    };

if (loading) {return <View style={styles.loading}><ActivityIndicator color={'green'} size={'large'} style={{alignSelf:'center'}}/></View>;}

            return(
                <View style={styles.container}>
                    <WrappedComponent {...props}/>

                    {currentOrder !== null && currentOrder !== undefined && (
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

export default withLiveOrder;
