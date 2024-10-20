import { createSlice } from '@reduxjs/toolkit';

interface authSlice{
    user:Record<string,any>|null;
    setUser:(user:any)=>void;
    setCurrentOrder:(order:any)=>void;
    currentOrder:Record<string,any>|null;
    logout:()=>void;
}

const initialState = {
    user: null,
    currentOrder: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCurrentOrder: (state,action) => {
      state.currentOrder = action.payload;
    },
    logout:(state)=>{
      state.user = null;
      state.currentOrder = null;
    }
  },
});

export const { setUser, setCurrentOrder,logout } = authSlice.actions;
export default authSlice.reducer;
