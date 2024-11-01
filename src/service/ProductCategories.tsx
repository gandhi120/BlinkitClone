// Create an async thunk for the API call
import {apiClient} from '@service/authService';

export const getAllCategories =  async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
        return[];
    }
  };

  export const getProductByCategoryById =  async (id:string) => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
      } catch (error) {
        return[];
      }
    };
