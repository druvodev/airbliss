import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: "flight",
  flightType: "oneWay",
  cityCount: 1,
  departureDate: new Date().getTime(), // Initialize as timestamp
  returnDate: new Date().getTime(), // Initialize as timestamp
  calendarModal: "",
  locationModal: "",
  fromCityInfo: {
    airportName: "Shahjalal International Airport",
    code: "DAC",
    destination: "Dhaka, Bangladesh",
  },
  toCityInfo: {
    airportName: "Barisal Airport",
    code: "BZL",
    destination: "Barisal, Bangladesh",
  },
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setFlightType: (state, action) => {
      state.flightType = action.payload;
    },
    setCityCount: (state, action) => {
      state.cityCount = action.payload;
    },
    setDepartureDate: (state, action) => {
      // Ensure action.payload is a valid date before converting to timestamp
      const date = new Date(action.payload);
      if (!isNaN(date)) {
        state.departureDate = date.getTime(); // Store as timestamp
      }
    },
    setReturnDate: (state, action) => {
      // Ensure action.payload is a valid date before converting to timestamp
      const date = new Date(action.payload);
      if (!isNaN(date)) {
        state.returnDate = date.getTime(); // Store as timestamp
      }
    },
    setCalendarModal: (state, action) => {
      state.calendarModal = action.payload;
    },
    setLocationModal: (state, action) => {
      state.locationModal = action.payload;
    },
    setFromCityInfo: (state, action) => {
      state.fromCityInfo = action.payload;
    },
    setToCityInfo: (state, action) => {
      state.toCityInfo = action.payload;
    },
  },
});

export const {
  setIsActive,
  setFlightType,
  setCityCount,
  setDepartureDate,
  setReturnDate,
  setCalendarModal,
  setFromCityInfo,
  setToCityInfo,
} = searchFilterSlice.actions;

export default searchFilterSlice.reducer;
