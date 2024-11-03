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
    console.log('createOrder ERROR',error);
      return null;
    }
  };


export const getOrderById =  async (orderId:string) => {
  try {
    const response = await apiClient.get(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.log('getOrderById ERROR',error);
    return null;
  }
};


export const fetchCustomerOrder =  async (userId:string) => {
  console.log('userId',userId);

  try {
    const response = await apiClient.get(`/order?customerId=${userId}`);
    return response.data;
  } catch (error) {
    console.log('fetchCustomerOrder ERROR',error);
    return null;
  }
};


export const fetchOrders =  async (status:string,userId:string,branchId:string) => {
  let uri = status == 'available' ? `/order?status=${status}&branchId=${branchId}` :
  `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;
  console.log('userId',userId);

  try {
    const response = await apiClient.get(uri);
    return response.data;
  } catch (error) {
    console.log('fetchOrders ERROR',error);
    return null;
  }
};
