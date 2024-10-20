import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import  counterReducer   from '@store/slice/counterSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reduxStorage from './mmkvStorage/storage'


const reducer = combineReducers({
  counter:counterReducer,
});

const persistConfig = {
  key: 'root',
  storage:reduxStorage,
  whitelist: ['counter'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

 const store = configureStore({
  reducer: persistedReducer,
  middleware:getDefaultMiddleware=>{
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

const persistor = persistStore(store);

export{store,persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
