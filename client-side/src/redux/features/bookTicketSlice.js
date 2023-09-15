import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  visibleDetails: false,
  showFlightDetails: false,
  showFlightSummary: false,
  showFareRules: false,
  selectedButton: "cheapest",
  flightData: [],
  singleFlightDetails: {},
  flightDetailsVisibility: {},
  currentPage: 1,
};

const bookTicketSlice = createSlice({
  name: "bookTicket",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVisibleDetails: (state, action) => {
      state.visibleDetails = !state.visibleDetails;
    },
    setShowFlightDetails: (state, action) => {
      state.showFlightDetails = action.payload;
    },
    setShowFlightSummary: (state, action) => {
      state.showFlightSummary = action.payload;
    },
    setShowFareRules: (state, action) => {
      state.showFareRules = action.payload;
    },
    setSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    },
    setFlightData: (state, action) => {
      state.flightData = action.payload;
    },
    setsingleFlightDetails: (state, action) => {
      state.singleFlightDetails = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFlightDetailsVisibility: (state, action) => {
      state.flightDetailsVisibility = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setVisibleDetails,
  setShowFlightDetails,
  setShowFlightSummary,
  setShowFareRules,
  setSelectedButton,
  setFlightData,
  setsingleFlightDetails,
  setCurrentPage,
  setFlightDetailsVisibility,
} = bookTicketSlice.actions;

export default bookTicketSlice.reducer;
