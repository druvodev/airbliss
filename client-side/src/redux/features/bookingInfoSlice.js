import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flightInfo: {},
  userInfo: {},
  allBookings: [],
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
  },
});

export const { setFlightInfo, setUserInfo, setAllBookings } =
  bookingInfoSlice.actions;
export default bookingInfoSlice.reducer;
