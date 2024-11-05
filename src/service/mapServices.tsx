import apiClient from './authService';
// import { MAP_ACCESS_TOKEN } from '@service/config';
// import axios from 'axios';


const response = {'type':'FeatureCollection','query':[72.79843672071841,21.195964991893327],'features':[{'id':'poi.128849077671','type':'Feature','place_type':['poi'],'relevance':1,'properties':{'foursquare':'4d63129249758cfaa7b961f0','landmark':true,'address':'Adajan','category':'supermarket, shop, groceries, grocery, market, super'},'text':'Sahaj Super Store','place_name':'Sahaj Super Store, Adajan, Surat, Gujarat 395009, India','center':[72.798645,21.196245],'geometry':{'coordinates':[72.798645,21.196245],'type':'Point'},'context':[{'id':'neighborhood.105000043','mapbox_id':'dXJuOm1ieHBsYzpCa0lzYXc','text':'Muktanand Nagar'},{'id':'postcode.44854891','mapbox_id':'dXJuOm1ieHBsYzpBcXh1YXc','text':'395009'},{'id':'locality.2944772715','mapbox_id':'dXJuOm1ieHBsYzpyNFdxYXc','text':'Narotam Nagar'},{'id':'place.43255915','mapbox_id':'dXJuOm1ieHBsYzpBcFFJYXc','wikidata':'Q4629','text':'Surat'},{'id':'district.5375595','mapbox_id':'dXJuOm1ieHBsYzpVZ1py','wikidata':'Q1797317','text':'Surat'},{'id':'region.9323','mapbox_id':'dXJuOm1ieHBsYzpKR3M','wikidata':'Q1061','short_code':'IN-GJ','text':'Gujarat'},{'id':'country.8811','mapbox_id':'dXJuOm1ieHBsYzpJbXM','wikidata':'Q668','short_code':'in','text':'India'}]}],'attribution':'NOTICE: © 2024 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.'};

export const reverseGeocode =
     async (latitude:number,longitude:number,setUser:any,dispatch:any) => {
    try {
    // const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=${MAP_ACCESS_TOKEN}`);

      if(response?.features[0]?.place_name){
        const address = response?.features[0]?.place_name;
        updateUserLocation({liveLocation:{latitude,longitude},address},setUser,dispatch);
      }else{
        console.log('reverseGeocode ERROR',error);
      }
      return response?.features[0]?.place_name;
    } catch (error) {
      return null;
    }
  };


export const updateUserLocation =  async (data:any,setUser:any,dispatch:any) => {
    try {
      const response = await apiClient.patch('/user',data);
      dispatch(setUser(response?.data?.user));
    } catch (error) {
      console.log('sendLiveOrderUpdates ERROR',error);
      return null;
    }
  };
