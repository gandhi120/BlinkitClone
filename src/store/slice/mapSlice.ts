import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MapState {
    mapRef: any;
    setMapRef:()=>void;
}

const initialState: MapState = {
  mapRef: null,
  setMapRef:()=>{},
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapRef: (state,action: PayloadAction<any>) => {
      state.mapRef = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMapRef } = mapSlice.actions;

export default mapSlice.reducer;
