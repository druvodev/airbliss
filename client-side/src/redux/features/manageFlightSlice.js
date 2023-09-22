// trackingNavigationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  path: {},
  loading: false,
  updateMode: true,
};

const manageFlightSlice = createSlice({
  name: "manageFlight",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setupdateMode: (state, action) => {
      state.updateMode = action.payload;
    },
  },
});

export const { setFlights, setPath, setLoading, setupdateMode } =
  manageFlightSlice.actions;

export default manageFlightSlice.reducer;
