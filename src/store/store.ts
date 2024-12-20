import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import  counterReducer   from '@store/slice/counterSlice';
import reduxStorage from './mmkvStorage/storage';
import authSlice from '@store/slice/authSlice';
import cartSlice from '@store/slice/cartSlice';



const reducer = combineReducers({
  counter:counterReducer,
  auth:authSlice,
  cart:cartSlice,
});

const persistConfig = {
  key: 'root',
  storage:reduxStorage,
  whitelist: ['counter','auth','cart'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

 const store = configureStore({
  reducer: persistedReducer,
  middleware:getDefaultMiddleware=>{
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

const persistor = persistStore(store);

export{store,persistor};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
