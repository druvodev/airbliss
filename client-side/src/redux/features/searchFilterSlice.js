import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: "flight",
  flightType: "oneWay",
  cityCount: 1,
  departureDate: new Date(),
  returnDate: new Date(),
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
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
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
