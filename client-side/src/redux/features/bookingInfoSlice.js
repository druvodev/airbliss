import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightInfo: {},
  userInfo: {},
  allBookings: [],
  cancelRequests: [],
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
  },
});

export const { setFlightInfo, setUserInfo, setAllBookings, setCancelRequests } =
  bookingInfoSlice.actions;
export default bookingInfoSlice.reducer;
