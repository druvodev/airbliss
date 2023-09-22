import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightInfo: {},
  userInfo: {},
  allBookings: [],
  cancelRequests: [],
  airlines: [],
  selectedCard: null,
  bookingsRefetch: false,
};

export const bookingInfoSlice = createSlice({
  name: "userBookingInfo",
  initialState,
  reducers: {
    setFlightInfo: (state, action) => {
      state.flightInfo = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAllBookings: (state, action) => {
      state.allBookings = action.payload;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    setCancelRequests: (state, action) => {
      state.cancelRequests = action.payload;
    },
    setAirlines: (state, action) => {
      state.airlines = action.payload;
    },
    setBookingsRefetch: (state, action) => {
      state.bookingsRefetch = action.payload;
    },
  },
});

export const {
  setFlightInfo,
  setUserInfo,
  setAllBookings,
  setCancelRequests,
  setBookingsRefetch,
  setAirlines,
  setSelectedCard,
} = bookingInfoSlice.actions;
export default bookingInfoSlice.reducer;
