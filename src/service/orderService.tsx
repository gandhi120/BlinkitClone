import {apiClient} from '@service/authService';


export const createOrder =  async (items:any,totalPrice:number) => {
    try {
      const response = await apiClient.post('/order',{
        items:items,
        branch:'670d45823c1ba28fb19db88c',
        totalPrice:totalPrice,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };
