import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  accordionData: [],
  refetch: false,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },

    setAccordionData: (state, action) => {
      state.accordionData = action.payload;
    },

    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const { setServices, setRefetch, setAccordionData } =
  servicesSlice.actions;
export default servicesSlice.reducer;
