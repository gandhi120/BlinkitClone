import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import  counterReducer   from '@store/slice/counterSlice';
import reduxStorage from './mmkvStorage/storage';
import authSlice from '@store/slice/authSlice';


const reducer = combineReducers({
  counter:counterReducer,
  auth:authSlice,
});

const persistConfig = {
  key: 'root',
  storage:reduxStorage,
  whitelist: ['counter','auth'],
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
