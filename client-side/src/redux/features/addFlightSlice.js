// trackingNavigationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allFlights: [],
  selectAirportId: "",
  selectAirportCode: "",
  chekAirportSelect: true,
};

const addFlightSlice = createSlice({
  name: "addFlight",
  initialState,
  reducers: {
    setAllFlights: (state, action) => {
      state.allFlights = action.payload;
    },
    setSelectAirportId: (state, action) => {
      state.selectAirportId = action.payload;
    },
    setSelectAirportCode: (state, action) => {
      state.selectAirportCode = action.payload;
    },
    setchekAirportSelect: (state, action) => {
      state.chekAirportSelect = action.payload;
    },
  },
});

export const {
  setAllFlights,
  setSelectAirportId,
  setSelectAirportCode,
  setchekAirportSelect,
} = addFlightSlice.actions;

export default addFlightSlice.reducer;
