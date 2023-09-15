import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightInfo: {},
  userInfo: {},
  allBookings: [],
  cancelRequests: [],
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
    setCancelRequests: (state, action) => {
      state.cancelRequests = action.payload;
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
} = bookingInfoSlice.actions;
export default bookingInfoSlice.reducer;
