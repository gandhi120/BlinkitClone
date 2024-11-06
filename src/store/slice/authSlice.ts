import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {apiClient} from '@service/authService';
import reduxStorage, { clearAllData } from '@store/mmkvStorage/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import {persistor} from '@store/store';
interface AuthState {
  user: Record<string,any>|null;
  currentOrder:Record<string,any>|null
  loading: boolean;
  accessToken: string;
}


const initialState:AuthState = {
  user: null,
  currentOrder: null,
  loading: false,
  accessToken: '',
};

// Create an async thunk for the API call
export const reFetchUser = createAsyncThunk('reFetchUser', async (_,thunkApi) => {
  try {
    const response = await apiClient.get('/user');
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
interface UpdateUserParams {
    password: string;
    email: string;
}

export const deliveryLogin = createAsyncThunk<any,UpdateUserParams>('deliveryLogin', async ( {email, password } ,thunkApi) => {
  try {
    const response = await apiClient.post('/delivery/login', {email,password} );
    return response.data;
  } catch (error) {
    console.log('error',error);
    return thunkApi.rejectWithValue(error);
  }

});


export const fetchUser = createAsyncThunk('fetchUser', async (params:string,thunkApi) => {
  try {
    const phone = params;
    const response = await apiClient.post('/customer/login', {phone} );
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }

});

// Create an async thunk for the API call
export const refetchToken = createAsyncThunk('refetchToken', async (_,thunkApi) => {
  try {
    const refreshToken = await reduxStorage.getItem('refreshToken');
    const response = await apiClient.post('/refresh-token/login', {refreshToken} );
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setCurrentOrder: (state,action: PayloadAction<any>) => {
      state.currentOrder = action.payload;
    },
    logout:(state)=>{
      state.user = null;
      state.currentOrder = null;
      persistor.purge();
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchUser.pending,(state)=>{
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled,(state,action: PayloadAction<any>)=>{
      const {accessToken,refreshToken,customer} = action.payload;
      state.loading = false;
      state.user = customer;
      state.accessToken = accessToken;
      reduxStorage.setItem('accessToken',accessToken);
      reduxStorage.setItem('refreshToken',refreshToken);
    });
    builder.addCase(fetchUser.rejected,(state)=>{
      state.loading = false;
    });
    builder.addCase(refetchToken.fulfilled,(state,action)=>{
      const {accessToken,refreshToken} = action.payload;
      state.accessToken = accessToken;
      reduxStorage.setItem('accessToken',accessToken);
      reduxStorage.setItem('refreshToken',refreshToken);
      state.loading = false;
    });
    builder.addCase(refetchToken.rejected,()=>{
      clearAllData();
      resetAndNavigate('CustomerLogin');
    });
    builder.addCase(reFetchUser.fulfilled,(state,action)=>{
      const {user} = action.payload;
      state.user = user;
    });
    builder.addCase(reFetchUser.rejected,(state)=>{
      state.loading = false;
    });
    builder.addCase(deliveryLogin.fulfilled,(state,action)=>{
      const {deliveryPartner,accessToken,refreshToken} = action.payload;
      state.user = deliveryPartner;
      state.accessToken = accessToken;
      reduxStorage.setItem('accessToken',accessToken);
      reduxStorage.setItem('refreshToken',refreshToken);
    });
    builder.addCase(deliveryLogin.rejected,(state)=>{
      state.loading = false;
    });
  },
});

export const { setUser, setCurrentOrder,logout } = authSlice.actions;
export default authSlice.reducer;
