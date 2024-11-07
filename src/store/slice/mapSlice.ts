import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MapState {
    mapRef: any;
    cameraRef:any;
    setMapRef:()=>void;
    setCameraRef:()=>void;
}

const initialState: MapState = {
  mapRef: null,
  cameraRef:null,
  setMapRef:()=>{},
  setCameraRef:()=>{},
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapRef: (state,action: PayloadAction<any>) => {
      console.log('action',action);

      state.mapRef = action.payload;
    },
    setCameraRef: (state,action: PayloadAction<any>) => {
      state.cameraRef = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMapRef ,setCameraRef} = mapSlice.actions;

export default mapSlice.reducer;
