import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  refetch: false,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },

    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const { setServices, setRefetch } = servicesSlice.actions;
export default servicesSlice.reducer;
