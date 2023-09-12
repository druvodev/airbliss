// trackingNavigationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isCollapse: true,
  data: null,
};

const trackingNavigationSlice = createSlice({
  name: "trackingNavigation",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setIsCollapse: (state, action) => {
      state.isCollapse = !state.isCollapse;
    },

    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setIsLoading, setIsCollapse, setData } =
  trackingNavigationSlice.actions;

export default trackingNavigationSlice.reducer;
