import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {apiClient} from '@service/authService';

interface CartItem {
    _id:string|number;
    item:any;
    count:number
}
interface CartState {
    cart:CartItem[];
    itemCount:number;
    totalCount:number;
    addItem:(item:any)=>void;
    removeItem:(id:string|number)=>void;
    clearCart:()=>void;
    getItemCount:(id:string|number)=>number;
    getTotalPrice:()=>number;
}


const initialState:CartState = {
  cart:[],
  itemCount:0,
  totalCount:0,
  addItem: (item: CartItem) => { /* implement function */ },
  removeItem: (id: string | number) => { /* implement function */ },
  clearCart: () => { /* implement function */ },
  getItemCount: (id: string | number) => 0, // Default return
  getTotalPrice: () => 0, // Default return
};


// Create an async thunk for the API call
// export const refetchToken = createAsyncThunk('refetchToken', async (_,thunkApi) => {
//   try {
//     const refreshToken = await reduxStorage.getItem('refreshToken');
//     const response = await apiClient.post('/refresh-token/login', {refreshToken} );
//     return response.data;
//   } catch (error) {
//     return thunkApi.rejectWithValue(error);
//   }
// });ß

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
        console.log('action.payload',action.payload);
        console.log('action.cart',state.cart);


        const item = action.payload;
        const currentCart = state.cart;
        const existingItemIndex = currentCart.findIndex(cartItem=>cartItem?._id === item?._id);
console.log('existingItemIndex',existingItemIndex);

        //WHEN ITEM EXIST..
        if(existingItemIndex >= 0){
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                count:updatedCart[existingItemIndex].count + 1,
            };
            console.log('updatedCart',updatedCart);

        //set updated cart..
            state.cart = updatedCart;
        }else{
            state.cart = [...currentCart,{_id:item._id,item:item,count:1}];
        }
    },

    removeItem:(state, action: PayloadAction<any>) => {
        const item = action.payload;
        const currentCart = state.cart;
        const existingItemIndex = currentCart.findIndex(cartItem=>cartItem?._id === item?._id);
        if(existingItemIndex >= 0){
            const updatedCart = [...currentCart];
            const existingItem = updatedCart[existingItemIndex];
            if(existingItem.count > 1){
                updatedCart[existingItemIndex] = {
                    ...existingItem,
                    count:existingItem?.count - 1,
                };
            }else{
                updatedCart.splice(existingItemIndex,1);
            }
            //set updated cart..
            state.cart = updatedCart;
        }
    },

    clearCart:(state) => {
        state.cart = [];
    },
    getItemCount:(state,action: PayloadAction<any>)=>{
        const item = action.payload;
        const currentCart = state.cart;
        const cartItem = currentCart.find(itemCart=>itemCart?._id === item?._id);
        state.itemCount = cartItem ? cartItem?.count : 0;
    },
    getTotalPrice:(state)=>{
        const currentCart = state.cart;
        state.totalCount = currentCart.reduce((total,cartItem)=>total + cartItem?.item?.price * cartItem?.count,0);
    },
  },
});

export const { addItem,removeItem,clearCart ,getItemCount,getTotalPrice} = cartSlice.actions;
export default cartSlice.reducer;
