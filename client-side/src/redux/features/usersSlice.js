import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userBookings: [],
  flightRef: "",
};

export const usersSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
    },
    setFlightRef: (state, action) => {
      state.userBookings = action.payload;
    },
  },
});

export const { setUserInfo, setUserBookings, setFlightRef } =
  usersSlice.actions;
export default usersSlice.reducer;
