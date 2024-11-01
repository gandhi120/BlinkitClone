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
    getTotalPrice:()=>number;
}


const initialState:CartState = {
  cart:[],
  itemCount:0,
  totalCount:0,
  addItem: (item: CartItem) => { /* implement function */ },
  removeItem: (id: string | number) => { /* implement function */ },
  clearCart: () => { /* implement function */ },
  getTotalPrice: () => 0, // Default return
};


export const getItemCount = (cart:any,itemId:string)=>{
    let count = 0;
     cart.find((cartItem:any)=> {
        if(cartItem._id === itemId){
            count = cartItem.count;
        }
    });
    return count;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
        const item = action.payload;
        const currentCart = state.cart;
        const existingItemIndex = currentCart.findIndex(cartItem=>cartItem?._id === item?._id);
        //WHEN ITEM EXIST..
        if(existingItemIndex >= 0){
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                count:updatedCart[existingItemIndex].count + 1,
            };
        //set updated cart..
            state.cart = updatedCart;
        }else{
            state.cart = [...currentCart,{_id:item._id,item:item,count:1}];
        }
    },

    removeItem:(state, action: PayloadAction<any>) => {
        const item = action.payload;
        const currentCart = state.cart;
        const existingItemIndex = currentCart.findIndex(cartItem=>cartItem?._id === item);
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
    getTotalPrice:(state)=>{
        const currentCart = state.cart;
        state.totalCount = currentCart.reduce((total,cartItem)=>total + cartItem?.item?.price * cartItem?.count,0);
    },
  },
});

export const { addItem,removeItem,clearCart,getTotalPrice} = cartSlice.actions;
export default cartSlice.reducer;
